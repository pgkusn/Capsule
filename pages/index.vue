<template>
    <div class="index">
        <div ref="intro" class="intro" />

        <main>
            <div ref="gacha" class="gacha" :class="{ bounceIn: !ignoreOpening, running: loaded }" />

            <div ref="bg" class="bg" :class="{ fadeIn: !ignoreOpening, running: loaded }" />

            <div class="content container" :class="{ fadeIn: !ignoreOpening, running: loaded }">
                <div class="row">
                    <div class="col">
                        <div ref="peopleLeft" />
                        <div class="btn-group">
                            <button class="history-btn" @click.prevent="setCurrentPopup('History')">
                                <img src="@/assets/images/btn-history.png" alt="中獎紀錄">
                            </button>
                            <button class="share-btn" @click.prevent="setCurrentPopup('Share')">
                                <img src="@/assets/images/btn-share.png" alt="分享再扭一次">
                            </button>
                        </div>
                    </div>
                    <div class="col">
                        <div class="content__title">
                            <hgroup>
                                <h1>
                                    <img src="@/assets/images/title.png" alt="1111 驚喜扭扭樂">
                                </h1>
                                <h2>
                                    <picture>
                                        <source media="(max-width: 768px)" srcset="@/assets/images/subtitle-s@2x.png 2x, @/assets/images/subtitle-s@3x.png 3x">
                                        <img src="@/assets/images/subtitle.png" srcset="@/assets/images/subtitle@2x.png 2x, @/assets/images/subtitle@3x.png 3x" alt="台劇華劇扭起來！Vidol 11人VIP歡樂看、11日VIP體驗序號及超多折扣!">
                                    </picture>
                                </h2>
                            </hgroup>
                            <button class="warning-btn" @click.prevent="setCurrentPopup('Warning')" />
                        </div>
                        <div ref="peopleRight" />
                        <button class="draw-btn" @click.prevent="setCurrentPopup('Draw')">
                            <img src="@/assets/images/btn-draw.png" alt="快扭我">
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <transition name="fade">
            <Popup v-if="showPopup" v-model="showPopup">
                <component :is="currentPopup" />
            </Popup>
        </transition>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Warning from '@/components/Warning.vue';
import Popup from '@/components/Popup.vue';
import History from '@/components/History.vue';
import Draw from '@/components/Draw.vue';
import Share from '@/components/Share.vue';

// lottie data
import gachaData from '@/static/lottieData/gacha.json';
import introData from '@/static/lottieData/intro.json';
import introMbData from '@/static/lottieData/intro-s.json';
import bgData from '@/static/lottieData/bg.json';
import bgMbData from '@/static/lottieData/bg-s.json';
import peopleLeftData from '@/static/lottieData/people-left.json';
import peopleLeftMbData from '@/static/lottieData/people-left-s.json';
import peopleRightData from '@/static/lottieData/people-right.json';
import peopleRightMbData from '@/static/lottieData/people-right-s.json';

export default {
    name: 'Index',
    components: {
        Warning,
        Popup,
        History,
        Draw,
        Share
    },
    data () {
        return {
            showPopup: false,
            animPlayed: false
        };
    },
    computed: {
        ...mapState([
            'tabletWidth',
            'currentPopup',
            'history',
            'drawRange',
            'ignoreOpening',
            'loaded'
        ]),
        lottieFiles () {
            const gachaFiles = gachaData.assets.map(asset => asset.u + asset.p).filter(value => value);
            const introFiles = introData.assets.map(asset => asset.u + asset.p).filter(value => value);
            const introMbFiles = introMbData.assets.map(asset => asset.u + asset.p).filter(value => value);
            const bgFiles = bgData.assets.map(asset => asset.u + asset.p).filter(value => value);
            const bgMbFiles = bgMbData.assets.map(asset => asset.u + asset.p).filter(value => value);
            const peopleLeftFile = peopleLeftData.assets.map(asset => asset.u + asset.p).filter(value => value);
            const peopleLeftMbFile = peopleLeftMbData.assets.map(asset => asset.u + asset.p).filter(value => value);
            const peopleRightFile = peopleRightData.assets.map(asset => asset.u + asset.p).filter(value => value);
            const peopleRightMbFile = peopleRightMbData.assets.map(asset => asset.u + asset.p).filter(value => value);

            const files = gachaFiles.concat(introFiles, bgFiles, peopleLeftFile, peopleRightFile);
            const mbFiles = introMbFiles.concat(bgMbFiles, peopleLeftMbFile, peopleRightMbFile);

            return this.tabletWidth ? mbFiles : files;
        }
    },
    watch: {
        async currentPopup (popupType) {
            if (!popupType) return;

            // 活動說明
            if (popupType === 'Warning') {
                this.showPopup = true;
                return;
            }

            await this.checkLogin();

            if (popupType === 'History') {
                // 查詢中獎紀錄
                await this.getHistory();
            }
            else if (popupType === 'Draw') {
                // 抽獎
                await this.getDrawRange();
                if (!this.drawRange.draw) {
                    await this.draw();
                }
            }
            else if (popupType === 'Share') {
                // 分享
                await this.getDrawRange();
            }

            this.showPopup = true;
        },
        async tabletWidth (value) {
            // preload lottie image
            if (!this.animPlayed && !this.ignoreOpening) {
                NProgress.start();
                await this.preloadLottieImg();
                this.setLoaded();
                NProgress.done();
            }

            this.initLottie();

            this.preloadPopupImg();
        }
    },
    mounted () {
        // this.setIgnoreOpening(); // debug

        // open popup after login
        const currentPopup = localStorage.getItem('returnPopup');
        if (currentPopup) {
            this.setIgnoreOpening();
            this.setCurrentPopup(currentPopup);
            localStorage.removeItem('returnPopup');
        }
    },
    methods: {
        ...mapMutations([
            'setCurrentPopup',
            'setUserToken',
            'setIgnoreOpening',
            'setLoaded'
        ]),
        ...mapActions([
            'getHistory',
            'getDrawRange',
            'share',
            'draw'
        ]),
        checkLogin () {
            return new Promise((resolve, reject) => {
                const userToken = this.$Cookies.get('_user_token');
                if (!userToken) {
                    // 將 currentPopup 設成 null (為了下次可觸發 watch) 前先存入 localStorage
                    localStorage.setItem('returnPopup', this.currentPopup);
                    this.showPopup = false;
                    this.setCurrentPopup(null);

                    this.$swal({
                        icon: 'info',
                        title: '請先登入 Vidol 會員',
                        confirmButtonText: '立即登入',
                        heightAuto: false
                    }).then(result => {
                        if (result.isConfirmed) {
                            this.redirectToLogin();
                        }
                        else {
                            localStorage.removeItem('returnPopup', this.currentPopup);
                        }
                    });
                    return;
                }
                this.setUserToken(userToken);
                resolve();
            });
        },
        redirectToLogin () {
            // 模擬登入
            if (location.hostname === 'localhost') {
                this.$Cookies.set('_user_token', this.$config.USER_TOKEN, { expires: 1 });
                setTimeout(() => {
                    location.reload();
                }, 500);
                return;
            }

            this.$Cookies.set('user_signed_in_redirect_to', location.origin + location.pathname, { domain: 'vidol.tv' });
            const redirectUrl = {
                sit: 'https://webtest.vidol.tv/login',
                prod: 'https://vidol.tv/login'
            };
            location.href = redirectUrl[this.$config.ENV];
        },
        initLottie () {
            this.$lottie.destroy();

            // intro
            if (!this.ignoreOpening) {
                const introAnim = this.$lottie.loadAnimation({
                    container: this.$refs.intro,
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                    animationData: this.tabletWidth ? introMbData : introData
                });
                introAnim.addEventListener('DOMLoaded', () => {
                    this.setSVGAttr(this.$refs.intro.firstChild);
                });
            }

            // bg
            const bgAnim = this.$lottie.loadAnimation({
                container: this.$refs.bg,
                renderer: 'svg',
                loop: true,
                autoplay: false,
                animationData: this.tabletWidth ? bgMbData : bgData
            });
            bgAnim.addEventListener('DOMLoaded', () => {
                this.setSVGAttr(this.$refs.bg.firstChild);
            });

            // gacha
            const gachaAnim = this.$lottie.loadAnimation({
                container: this.$refs.gacha,
                renderer: 'svg',
                loop: true,
                autoplay: false,
                animationData: gachaData
            });

            // peopleLeft
            this.$lottie.loadAnimation({
                container: this.$refs.peopleLeft,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: this.tabletWidth ? peopleLeftMbData : peopleLeftData
            });

            // peopleRight
            this.$lottie.loadAnimation({
                container: this.$refs.peopleRight,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: this.tabletWidth ? peopleRightMbData : peopleRightData
            });

            const delayTime = this.ignoreOpening || this.animPlayed ? 0 : 4000; // 4s: 2.5s gacha animation delay + 1.5s
            setTimeout(() => {
                gachaAnim.play();
                bgAnim.play();
                this.animPlayed = true;
            }, delayTime);
        },
        setSVGAttr (el) {
            el.setAttribute('preserveAspectRatio', 'xMidYMid slice'); // slice: 滿版
        },
        preloadLottieImg () {
            const vm = this;
            return new Promise((resolve, reject) => {
                const queue = new createjs.LoadQueue(false);
                queue.on('complete', () => resolve());
                queue.loadManifest(vm.lottieFiles);
            });
        },
        preloadPopupImg () {
            const files = [
                'images/popup-bg/is-drawn.jpg',
                'images/popup-bg/is-shared.jpg',
                'images/popup-bg/lose.jpg',
                'images/popup-bg/no-shared.jpg',
                'images/popup-bg/normal.jpg',
                'images/popup-bg/reward1.jpg',
                'images/popup-bg/reward2.jpg',
                'images/popup-bg/reward3.jpg',
                'images/popup-bg/reward4.jpg',
                'images/popup-bg/reward5.jpg'
            ];
            const mbFiles = [
                'images/popup-bg/is-drawn-s.jpg',
                'images/popup-bg/is-shared-s.jpg',
                'images/popup-bg/lose-s.jpg',
                'images/popup-bg/no-shared-s.jpg',
                'images/popup-bg/normal-s.jpg',
                'images/popup-bg/reward1-s.jpg',
                'images/popup-bg/reward2-s.jpg',
                'images/popup-bg/reward3-s.jpg',
                'images/popup-bg/reward4-s.jpg',
                'images/popup-bg/reward5-s.jpg'
            ];
            const queue = new createjs.LoadQueue(false);
            queue.loadManifest(this.tabletWidth ? mbFiles : files);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

.index {
    height: 100%;
}
main {
    position: relative;
    height: 100%;
}
.intro,
.bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.gacha {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: map-get($z-index, gacha-svg);
    display: flex;
    margin: auto;
    width: vw(385, $desktop-width);
    pointer-events: none;
    justify-content: center;
    align-items: center;
    @media (max-width: #{$tablet-width}px) {
        width: vw(140, $mobile-width);
    }
    &.bounceIn {
        animation: popup .5s cubic-bezier(.34, 1.56, .64, 1) 2.5s both paused;
    }
}
@keyframes popup {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
.content {
    position: relative;
    max-width: #{$desktop-width}px;
    width: calc(100% - 40px);
    height: 100%;
    > .row {
        position: absolute;
        top: 50%;
        left: 0;
        z-index: map-get($z-index, nav);
        display: flex;
        width: 100%;
        transform: translateY(-50%);
        justify-content: center;
        align-items: flex-end;
        @media (max-height: 869px) {
            transform: translateY(-50%);
        }
        @media (max-width: #{$tablet-width}px) {
            top: 0;
            height: 100%;
            transform: none;
        }
    }
    .col {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        @media (max-width: #{$tablet-width}px) {
            justify-content: center;
        }
        + .col {
            margin-left: vw(385, $desktop-width);
            @media (max-width: #{$tablet-width}px) {
                margin-left: vw(134, $mobile-width);
            }
        }
    }
    &__title {
        margin: 0 0 vw(50, $desktop-width) 20px;
        align-self: flex-start;
        @media (max-width: #{$tablet-width}px) {
            position: absolute;
            top: calc(50% - #{vw(105, $mobile-width)} - 123px);
            left: 50%;
            margin: 0;
            transform: translateX(-50%);
        }
        h1 {
            @media (max-width: #{$tablet-width}px) {
                margin: 0 auto;
                width: 270px;
            }
        }
        h2 {
            margin-top: 30px;
            padding-left: 16px;
            @media (max-width: #{$tablet-width}px) {
                margin: 10px auto 0;
                padding-left: 0;
                width: 310px;
            }
        }
    }
}
.btn-group {
    display: flex;
    @media (max-width: #{$tablet-width}px) {
        position: absolute;
        top: calc(50% + #{vw(115, $mobile-width)} + 60px);
        left: 50%;
        width: 335px;
        transform: translateX(-50%);
    }
}
.share-btn {
    margin-left: 20px;
}
.draw-btn {
    $btn-group-width: 609;
    $btn-width: 346;
    margin-right: percentage(($btn-group-width - $btn-width) / 2 / $btn-group-width);
    margin-left: percentage(($btn-group-width - $btn-width) / 2 / $btn-group-width);
    @media (max-width: #{$tablet-width}px) {
        position: absolute;
        top: calc(50% + #{vw(115, $mobile-width)});
        left: 50%;
        margin: 0;
        width: 195px;
        transform: translateX(-50%);
    }
}
.warning-btn {
    display: flex;
    margin: 20px 0 0 20px;
    align-items: center;
    @media (max-width: #{$tablet-width}px) {
        position: absolute;
        top: calc(100% + #{vw(25, $mobile-width)});
        left: calc(50% + #{vw(70, $mobile-width)});
        margin: 0;
    }
    &::before {
        margin-right: 5px;
        width: 0;
        height: 0;
        border-width: 14px 0 14px 19px;
        border-style: solid;
        border-color: transparent transparent transparent #000;
        content: '';
        @media (max-width: #{$tablet-width}px) {
            border-width: 8px 0 8px 12px;
        }
    }
    &::after {
        width: 125px;
        background-color: #000;
        color: #fff;
        content: '活動說明';
        text-align: center;
        letter-spacing: letter-spacing(10);
        font-size: 25px;
        line-height: 42px;
        @media (max-width: #{$tablet-width}px) {
            width: 76px;
            font-size: 14px;
            line-height: 26px;
        }
    }
}
</style>
