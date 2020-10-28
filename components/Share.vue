<template>
    <div class="share">
        <div v-if="drawRange" :class="popupClass" :style="{ backgroundImage: popupFileName && `url(images/popup-bg/${popupFileName}.jpg)` }">
            <a href class="share__btn" @click.prevent="fbShare">
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
        ...mapState(['tabletWidth', 'drawRange']),
        popupClass () {
            return this.drawRange.draw && this.drawRange.share ? 'is-shared' : 'no-shared';
        },
        popupFileName () {
            return this.popupClass ? this.tabletWidth ? `${this.popupClass}-s` : this.popupClass : '';
        }
    },
    watch: {
        async userID (value) {
            if (!this.drawRange.draw) {
                this.setCurrentPopup('Draw');
            }
            else if (!this.drawRange.share) {
                await this.share(value);
                this.setCurrentPopup('Draw');
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
                    appId: location.hostname === 'localhost' ? '512477409242587' : '1044817312247946',
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
        fbShare () {
            if (location.hostname === 'localhost') {
                this.userID = '666';
                console.log('已分享');
                return;
            }
            FB.ui(
                {
                    method: 'share',
                    display: 'popup',
                    href: location.hostname === 'localhost' ? 'https://vidol.tv/' : location.href
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
@import '@/assets/sass/common';

.share {
    position: relative;
    > div {
        padding-top: percentage(757/1294);
        width: 100%;
        background-color: #fff;
        background-size: contain;
        @media (max-width: #{$tablet-width}px) {
            padding-top: percentage(1045/748);
        }
    }
    &__btn {
        position: absolute;
        width: percentage(175/1294);
        height: percentage(85/757);
        @media (max-width: #{$tablet-width}px) {
            width: percentage(191/748);
            height: percentage(93/1045);
        }
        @at-root {
            .is-shared .share__btn {
                top: percentage(448/757);
                right: percentage(233/1294);
                @media (max-width: #{$tablet-width}px) {
                    top: percentage(657/1045);
                    right: percentage(277/748);
                }
            }
            .no-shared .share__btn {
                top: percentage(448/757);
                right: percentage(175/1294);
                @media (max-width: #{$tablet-width}px) {
                    top: percentage(657/1045);
                    right: percentage(277/748);
                }
            }
        }
    }
}
</style>
