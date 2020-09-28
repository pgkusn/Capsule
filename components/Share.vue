<template>
    <div class="share">
        <p>分享再扭一次</p>
        <a href class="share__fb" @click.prevent="share">
            <img src="@/assets/images/share_fb.png" alt="">
        </a>
    </div>
</template>

<script>
/* eslint-disable no-undef */
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Share',
    computed: {
        ...mapState(['jsonData'])
    },
    mounted () {
        this.fbInit();
    },
    methods: {
        ...mapMutations(['setCurrentPopup']),
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
        share () {
            if (this.$config.ENV === 'dev') {
                this.setCurrentPopup('Result');
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
                        this.setCurrentPopup('Result');
                    }
                    else {
                        console.log('Error while posting.');
                    }
                }
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.share {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    width: 100%;
    height: 50vh;
    background-color: #fff;
    font-size: 2rem;
    justify-content: center;
    align-items: center;
    &__fb {
        margin-top: 1rem;
        width: 94px;
    }
}
</style>
