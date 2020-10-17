<template>
    <main>
        <div ref="gacha" class="gacha full-page" />
        <div ref="intro" class="intro full-page" />
        <div ref="bg" class="bg full-page fadeIn" />
        <div class="people">
            <div ref="peopleLeft" class="people__left fadeIn" />
            <div ref="peopleRight" class="people__right fadeIn" />
        </div>

        <nav class="fadeIn">
            <a href @click.prevent="setCurrentPopup('History')">我的中獎紀錄</a>
            <a href @click.prevent="setCurrentPopup('Share')">分享再扭一次</a>
            <a href @click.prevent="setCurrentPopup('Draw')">快扭我</a>
            <a href @click.prevent="setCurrentPopup('Warning')">活動注意事項</a>
        </nav>

        <transition name="fade">
            <Popup v-if="showPopup" v-model="showPopup">
                <component :is="currentPopup" />
            </Popup>
        </transition>
    </main>
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
        ...mapActions(['getHistory', 'getDrawRange', 'share', 'draw']),
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
    top: 50%;
    left: 50%;
    display: flex;
    max-width: 1800px;
    width: 100%;
    height: 200px;
    transform: translateX(-50%);
    justify-content: space-between;
    &__left {
        margin-right: percentage(400 / 1920);
    }
}
nav {
    position: absolute;
    top: 70%;
    left: 50%;
    z-index: map-get($z-index, nav);
    display: flex;
    max-width: 1800px;
    width: 100%;
    height: 100px;
    transform: translateX(-50%);
    justify-content: space-between;
    > a {
        width: 295px;
        border-radius: 50px;
        background-color: #000;
        color: #fff;
        text-align: center;
        font-size: 35px;
        line-height: 100px;
        flex-shrink: 0;
        &:nth-child(1) {
        }
        &:nth-child(2) {
        }
        &:nth-child(3) {
        }
    }
}
</style>
