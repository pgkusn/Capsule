<template>
    <div class="main-container">
        <div ref="intro" class="intro full-page" />
        <main>
            <div ref="gacha" class="gacha full-page" />
            <div ref="bg" class="bg full-page fadeIn" />
            <div class="people">
                <div ref="peopleLeft" class="people__item fadeIn" />
                <div ref="peopleRight" class="people__item fadeIn" />
            </div>
            <div class="content">
                <hgroup class="title fadeIn">
                    <h1><img src="@/assets/images/title.png" alt="1111 驚喜扭扭樂"></h1>
                    <h2><img src="@/assets/images/subtitle.png" alt="台劇華劇扭起來！Vidol 11人VIP歡樂看、11日VIP體驗序號及超多折扣!"></h2>
                </hgroup>

                <ul class="nav fadeIn">
                    <li>
                        <button class="history-btn" @click.prevent="setCurrentPopup('History')">
                            <img src="@/assets/images/btn-history.png" alt="中獎紀錄">
                        </button>
                        <button class="share-btn" @click.prevent="setCurrentPopup('Share')">
                            <img src="@/assets/images/btn-share.png" alt="分享再扭一次">
                        </button>
                    </li>
                    <li>
                        <button class="draw-btn" @click.prevent="setCurrentPopup('Draw')">
                            <img src="@/assets/images/btn-draw.png" alt="快扭我">
                        </button>
                    </li>
                </ul>

                <button class="warning-btn fadeIn" @click.prevent="setCurrentPopup('Warning')">
                    <img src="https://fakeimg.pl/295x97/?text=活動注意事項&font=noto" style="border-radius:50px" alt="活動注意事項">
                </button>

                <transition name="fade">
                    <Popup v-if="showPopup" v-model="showPopup">
                        <component :is="currentPopup" />
                    </Popup>
                </transition>
            </div>
        </main>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import gachaData from '@/static/animationData/gacha.json';
import introData from '@/static/animationData/intro.json';
import peopleLeftData from '@/static/animationData/people-left.json';
import peopleRightData from '@/static/animationData/people-right.json';
import bgData from '@/static/animationData/bg.json';
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
            showPopup: false
        };
    },
    computed: {
        ...mapState(['currentPopup', 'history', 'drawRange'])
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
                await Promise.all([this.draw(), this.getDrawRange()]);
            }
            else if (popupType === 'Share') {
                // 分享
                await this.getDrawRange();
            }

            this.showPopup = true;
        }
    },
    mounted () {
        // open popup after login
        const currentPopup = localStorage.getItem('returnPopup');
        if (currentPopup) {
            this.setCurrentPopup(currentPopup);
            localStorage.removeItem('returnPopup');
        }

        this.initLottie();
    },
    methods: {
        ...mapMutations(['setCurrentPopup', 'setUserToken']),
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
            if (this.$config.ENV === 'dev') {
                location.href = this.$config.API_URL;
                this.$Cookies.set(
                    '_user_token',
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6MTkwODIyfQ.eyJpZGVudGl0eSI6eyJvYmplY3RJZCI6InZ4SlNBNHZYakIiLCJtZW1iZXJfaWQiOiJrZEdWUDQiLCJzb3VyY2UiOiJ2aWRvbCIsImVtYWlsVmVyaWZpZWQiOmZhbHNlfSwiaXNzIjoidmlkb2wudHYiLCJpYXQiOjE2MDAzMDA4NzAsImV4cCI6MTYwMDkwNTY3MH0.5ZLvoYYxJlh_W-g2OjW9aUD-aLZ72kA0B8oSJRQ8MAfeohr6MszshoK8AZwwSMOUXnGtZXHr814ggVUlGQ9jRg',
                    { expires: 1 }
                );
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
                renderer: 'svg',
                loop: true,
                autoplay: false,
                animationData: gachaData
            });
            // gachaAnim.addEventListener('DOMLoaded', () => {
            //     this.setSVGAttr(this.$refs.gacha.firstChild);
            // });

            // intro
            const introAnim = this.$lottie.loadAnimation({
                container: this.$refs.intro,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: introData
            });
            introAnim.addEventListener('DOMLoaded', () => {
                this.setSVGAttr(this.$refs.intro.firstChild);
            });

            // bg
            const bgAnim = this.$lottie.loadAnimation({
                container: this.$refs.bg,
                renderer: 'svg',
                loop: true,
                autoplay: false,
                animationData: bgData
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
                animationData: peopleLeftData
            });
            // peopleLeftAnim.addEventListener('DOMLoaded', () => {
            //     this.setSVGAttr(this.$refs.peopleLeft.firstChild);
            // });

            // peopleRight
            const peopleRightAnim = this.$lottie.loadAnimation({
                container: this.$refs.peopleRight,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: peopleRightData
            });
            // peopleRightAnim.addEventListener('DOMLoaded', () => {
            //     this.setSVGAttr(this.$refs.peopleRight.firstChild);
            // });

            setTimeout(() => {
                gachaAnim.play();
                bgAnim.play();
            }, 4000); // 2.5s gacha animation delay + 1.5s
        },
        setSVGAttr (el) {
            el.setAttribute('preserveAspectRatio', 'xMidYMid slice'); // slice:滿版
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

main {
    position: relative;
    padding: 0 20px;
    height: 100%;
}
.main-container {
    height: 100%;
}
.full-page {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.gacha {
    z-index: map-get($z-index, gacha-svg);
    animation: popup .5s cubic-bezier(.34, 1.56, .64, 1) 2.5s both;
}
@keyframes popup {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
.people {
    position: absolute;
    top: 55%;
    left: 50%;
    display: flex;
    width: 100%;
    transform: translateX(-50%);
    justify-content: center;
    &__item + .people__item {
        margin-left: 400px;
    }
}
.content {
    position: relative;
    height: 100%;
}
.title {
    position: absolute;
    bottom: 50%;
    left: calc(50% + 200px);
}
h2 {
    margin-top: 30px;
    padding-left: 16px;
}
.nav {
    position: absolute;
    top: 76%;
    left: 50%;
    z-index: map-get($z-index, nav);
    display: flex;
    width: 100%;
    height: 100px;
    transform: translateX(-50%);
    justify-content: center;
    align-items: center;
    > li {
        display: flex;
        width: 700px;
        justify-content: center;
        + li {
            margin-left: 400px;
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
