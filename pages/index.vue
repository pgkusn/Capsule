<template>
    <main>
        <Gacha />

        <a href class="warning-toggler" @click.prevent="setCurrentPopup('Warning')">活動注意事項</a>

        <nav>
            <a href @click.prevent="setCurrentPopup('History')">我的中獎紀錄</a>
            <a href @click.prevent="setCurrentPopup('Draw')">快扭我</a>
            <a href @click.prevent="setCurrentPopup('Share')">分享再扭一次</a>
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
import Warning from '@/components/Warning.vue';
import Popup from '@/components/Popup.vue';
import History from '@/components/History.vue';
import Draw from '@/components/Draw.vue';
import Share from '@/components/Share.vue';
import Gacha from '@/components/Gacha/Gacha.vue';

export default {
    name: 'Index',
    components: {
        Warning,
        Popup,
        History,
        Draw,
        Share,
        Gacha,
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
        const currentPopup = localStorage.getItem('returnPopup');
        if (currentPopup) {
            this.setCurrentPopup(currentPopup);
            localStorage.removeItem('returnPopup');
        }
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

            this.$Cookies.set('user_signed_in_redirect_to', location.origin + location.pathname, { domain: 'vidol.tv' });
            const redirectUrl = {
                sit: 'https://webtest.vidol.tv/login',
                prod: 'https://vidol.tv/login'
            };
            location.href = redirectUrl[this.$config.ENV];
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

.warning-toggler {
    position: absolute;
    top: 30%;
    right: 0;
    left: 0;
    margin: 0 auto;
    width: 150px;
    height: 50px;
    background-color: #c00;
    color: #fff;
    text-align: center;
    line-height: 50px;
}
nav {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: map-get($z-index, nav);
    display: flex;
    margin: auto;
    width: 800px;
    height: 100px;
    justify-content: space-evenly;
    align-items: center;
    > a {
        width: 150px;
        height: 50px;
        background-color: #000;
        color: #fff;
        text-align: center;
        line-height: 50px;
    }
}
</style>
