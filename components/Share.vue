<template>
    <div class="share">
        <div v-if="drawRange">
            <p v-if="drawRange.draw && drawRange.share">
                今天分享過了！<br>明天再來扭～
            </p>
            <p v-else>
                分享再扭一次
            </p>
            <a href class="share__fb" @click.prevent="fbShare">
                <img src="@/assets/images/share_fb.png" alt="">
            </a>
        </div>
        <div v-else>
            <Loading class="draw__loading" />
        </div>
    </div>
</template>

<script>
/* eslint-disable no-undef */
import { mapState, mapMutations, mapActions } from 'vuex';
import Loading from '@/components/Loading.vue';

export default {
    name: 'Share',
    components: {
        Loading
    },
    data () {
        return {
            userID: ''
        };
    },
    computed: {
        ...mapState(['drawRange'])
    },
    watch: {
        async userID (value) {
            if (!this.drawRange.draw) {
                this.setCurrentPopup('Draw');
            }
            else if (!this.drawRange.share) {
                const result = await this.share({
                    user_token: this.$Cookies.get('_user_token'),
                    fb: value
                });
                if (result.code === 'S0000000') {
                    this.setCurrentPopup('Draw');
                }
                else {
                    console.error(result.message);
                    this.$nuxt.error({ statusCode: 500, message: '網路連線錯誤，請稍後再試！' });
                    this.$nuxt.$loading.finish();
                }
            }
        }
    },
    mounted () {
        this.fbInit();
    },
    methods: {
        ...mapMutations(['setCurrentPopup']),
        ...mapActions(['share']),
        fbInit () {
            window.fbAsyncInit = () => {
                FB.init({
                    appId: this.$config.ENV === 'dev' ? '512477409242587' : '1044817312247946',
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v2.10',
                    oauth: true
                });
                FB.AppEvents.logPageView();
                // FB.logout(); // test
            };
            (function (d, s, id) {
                var js;
                var fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = '//connect.facebook.net/en_US/sdk.js';
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
        },
        fbShare () {
            if (this.$config.ENV === 'dev') {
                this.userID = '666';
                console.log('已分享');
                return;
            }
            FB.ui(
                {
                    method: 'share',
                    display: 'popup',
                    href: this.$config.ENV === 'dev' ? 'https://vidol.tv/' : location.href
                },
                res => {
                    if (res && !res.error_message) {
                        this.setUserID();
                    }
                    else {
                        console.log('Error while posting.');
                    }
                }
            );
        },
        setUserID () {
            FB.getLoginStatus(res => {
                if (res.status !== 'connected') {
                    FB.login(res => {
                        this.userID = res.authResponse.userID;
                    });
                }
                else {
                    this.userID = res.authResponse.userID;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.share {
    display: flex;
    padding: 2rem;
    width: 100%;
    height: 50vh;
    background-color: #fff;
    font-size: 2rem;
    line-height: 1.2;
    justify-content: center;
    align-items: center;
    &__fb {
        display: block;
        margin: 1rem auto 0;
        width: 94px;
    }
}
</style>
