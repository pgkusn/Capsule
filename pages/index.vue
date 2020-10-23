<template>
    <div class="main-container">
        <div v-if="!ignoreOpening" ref="intro" class="intro" />
        <main>
            <div ref="gacha" class="gacha" :class="{ bounceIn: !ignoreOpening }" />

            <div ref="bg" class="bg" :class="{ fadeIn: !ignoreOpening }" />

            <div class="content container" :class="{ fadeIn: !ignoreOpening }">
                <ul>
                    <li>
                        <div ref="peopleLeft" />
                        <div class="content__btn-group">
                            <button class="history-btn" @click.prevent="setCurrentPopup('History')">
                                <img src="@/assets/images/btn-history.png" alt="中獎紀錄">
                            </button>
                            <button class="share-btn" @click.prevent="setCurrentPopup('Share')">
                                <img src="@/assets/images/btn-share.png" alt="分享再扭一次">
                            </button>
                        </div>
                    </li>
                    <li>
                        <hgroup class="content__title">
                            <h1><img src="@/assets/images/title.png" alt="1111 驚喜扭扭樂"></h1>
                            <h2><img src="@/assets/images/subtitle.png" alt="台劇華劇扭起來！Vidol 11人VIP歡樂看、11日VIP體驗序號及超多折扣!"></h2>
                        </hgroup>
                        <div ref="peopleRight" />
                        <button class="draw-btn" @click.prevent="setCurrentPopup('Draw')">
                            <img src="@/assets/images/btn-draw.png" alt="快扭我">
                        </button>
                    </li>
                </ul>

                <button class="warning-btn" @click.prevent="setCurrentPopup('Warning')">
                    <img src="https://fakeimg.pl/295x97/?text=活動注意事項&font=noto" style="border-radius:50px" alt="活動注意事項">
                </button>
            </div>

            <transition name="fade">
                <Popup v-if="showPopup" v-model="showPopup">
                    <component :is="currentPopup" />
                </Popup>
            </transition>
        </main>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import gachaData from '@/static/lottieData/gacha.json';
import introData from '@/static/lottieData/intro.json';
import introDataMb from '@/static/lottieData/intro-s.json';
import bgData from '@/static/lottieData/bg.json';
import bgDataMb from '@/static/lottieData/bg-s.json';
import peopleLeftData from '@/static/lottieData/people-left.json';
import peopleLeftDataMb from '@/static/lottieData/people-left-s.json';
import peopleRightData from '@/static/lottieData/people-right.json';
import peopleRightDataMb from '@/static/lottieData/people-right-s.json';
import Warning from '@/components/Warning.vue';
import Popup from '@/components/Popup.vue';
import History from '@/components/History.vue';
import Draw from '@/components/Draw.vue';
import Share from '@/components/Share.vue';

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
        ...mapState(['tabletWidth', 'currentPopup', 'history', 'drawRange', 'ignoreOpening'])
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
        tabletWidth (value) {
            this.$lottie.destroy();
            this.initLottie();
        }
    },
    mounted () {
        this.setIgnoreOpening(); // debug

        // open popup after login
        const currentPopup = localStorage.getItem('returnPopup');
        if (currentPopup) {
            this.setIgnoreOpening();
            this.setCurrentPopup(currentPopup);
            localStorage.removeItem('returnPopup');
        }
    },
    methods: {
        ...mapMutations(['setCurrentPopup', 'setUserToken', 'setIgnoreOpening']),
        ...mapActions(['getHistory', 'getDrawRange', 'share', 'draw', 'preloadImg']),
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
                        confirmButtonText: '立即登入'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.redirectToLogin();
                        }
                        else {
                            localStorage.removeItem(
                                'returnPopup',
                                this.currentPopup
                            );
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

            this.$Cookies.set(
                'user_signed_in_redirect_to',
                location.origin + location.pathname,
                { domain: 'vidol.tv' }
            );
            const redirectUrl = {
                sit: 'https://webtest.vidol.tv/login',
                prod: 'https://vidol.tv/login'
            };
            location.href = redirectUrl[this.$config.ENV];
        },
        initLottie () {
            // gacha
            const gachaAnim = this.$lottie.loadAnimation({
                container: this.$refs.gacha,
                renderer: 'canvas',
                loop: true,
                autoplay: false,
                animationData: gachaData
            });
            this.$refs.gacha.firstChild.style.height = 'auto';

            // intro
            this.$nextTick(() => {
                if (this.$refs.intro) {
                    const introAnim = this.$lottie.loadAnimation({
                        container: this.$refs.intro,
                        renderer: 'svg',
                        loop: false,
                        autoplay: true,
                        animationData: this.tabletWidth ? introDataMb : introData
                    });
                    introAnim.addEventListener('DOMLoaded', () => {
                        this.setSVGAttr(this.$refs.intro.firstChild);
                    });
                }
            });

            // bg
            const bgAnim = this.$lottie.loadAnimation({
                container: this.$refs.bg,
                renderer: 'svg',
                loop: true,
                autoplay: false,
                animationData: this.tabletWidth ? bgDataMb : bgData
            });
            bgAnim.addEventListener('DOMLoaded', () => {
                this.setSVGAttr(this.$refs.bg.firstChild);
            });

            // peopleLeft
            const peopleLeftAnim = this.$lottie.loadAnimation({
                container: this.$refs.peopleLeft,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: this.tabletWidth ? peopleLeftDataMb : peopleLeftData
            });

            // peopleRight
            const peopleRightAnim = this.$lottie.loadAnimation({
                container: this.$refs.peopleRight,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: this.tabletWidth ? peopleRightDataMb : peopleRightData
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
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

main {
    position: relative;
    height: 100%;
}
.main-container {
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
    margin: auto;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.bounceIn {
        animation: popup .5s cubic-bezier(.34, 1.56, .64, 1) 2.5s both;
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
    ul {
        position: absolute;
        top: 50%;
        left: 0;
        z-index: map-get($z-index, nav);
        display: flex;
        width: 100%;
        transform: translateY(-40%);
        justify-content: space-between;
        align-items: flex-end;
    }
    li {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        + li {
            margin-left: 400px;
        }
    }
    &__btn-group {
        display: flex;
    }
    &__title {
        margin-bottom: vw(100, $desktop-width);
        > h2 {
            margin-top: 30px;
            padding-left: 16px;
        }
    }
}
.share-btn {
    margin-left: 20px;
}
.draw-btn {
    width: vw(346, $desktop-width);
}
.warning-btn {
    position: absolute;
    top: 20%;
    left: 10%;
    z-index: map-get($z-index, nav);
    width: vw(295, $desktop-width);
}
</style>
