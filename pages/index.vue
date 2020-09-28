<template>
    <main>
        <a
            href
            class="warning-toggler"
            @click.prevent="setCurrentPopup('Warning')"
        >活動注意事項</a>

        <nav>
            <a href @click.prevent="setCurrentPopup('Record')">我的中獎紀錄</a>
            <a href @click.prevent="setCurrentPopup('Result')">快扭我</a>
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
import Record from '@/components/Record.vue';
import Result from '@/components/Result.vue';
import Share from '@/components/Share.vue';

export default {
    name: 'Index',
    components: {
        Warning,
        Popup,
        Record,
        Result,
        Share
    },
    data () {
        return {
            showPopup: false
        };
    },
    computed: {
        ...mapState(['jsonData', 'currentPopup'])
    },
    watch: {
        async currentPopup (value) {
            if (!value) return;

            // 活動說明
            if (value === 'Warning') {
                this.showPopup = true;
                return;
            };

            await this.checkLogin().then(() => {
                // 分享再扭一次
                if (value === 'Share') {
                    this.showPopup = true;
                    return;
                };

                // 抽獎 & 查詢中獎紀錄
                this.setJsonData(null);
                this.$nextTick(async () => {
                    this.$nuxt.$loading.start();
                    this.setLoading(true);

                    await this.getJsonData();
                    this.showPopup = true;

                    this.setLoading(false);
                    this.$nuxt.$loading.finish();
                });
            });
        }
    },
    mounted () {
        const currentPopup = localStorage.getItem('currentPopup');
        if (currentPopup) {
            this.setCurrentPopup(currentPopup);
            localStorage.removeItem('currentPopup');
        }
    },
    methods: {
        ...mapMutations(['setCurrentPopup', 'setUserToken', 'setLoading', 'setJsonData']),
        ...mapActions(['getJsonData']),
        checkLogin () {
            return new Promise((resolve, reject) => {
                // dev環境下直接設置cookie
                // if (this.$config.ENV === 'dev') {
                //     this.$Cookies.set('_user_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6MTkwODIyfQ.eyJpZGVudGl0eSI6eyJvYmplY3RJZCI6InZ4SlNBNHZYakIiLCJtZW1iZXJfaWQiOiJrZEdWUDQiLCJzb3VyY2UiOiJ2aWRvbCIsImVtYWlsVmVyaWZpZWQiOmZhbHNlfSwiaXNzIjoidmlkb2wudHYiLCJpYXQiOjE2MDAzMDA4NzAsImV4cCI6MTYwMDkwNTY3MH0.5ZLvoYYxJlh_W-g2OjW9aUD-aLZ72kA0B8oSJRQ8MAfeohr6MszshoK8AZwwSMOUXnGtZXHr814ggVUlGQ9jRg');
                // }

                const userToken = this.$Cookies.get('_user_token');
                if (!userToken) {
                    localStorage.setItem('currentPopup', this.currentPopup);

                    this.showPopup = false;
                    this.setCurrentPopup(null);

                    this.redirectToLogin();
                    return;
                }
                this.setUserToken(userToken);
                resolve();
            });
        },
        async redirectToLogin () {
            const result = await this.$swal({
                icon: 'info',
                title: '請先登入 Vidol 會員',
                confirmButtonText: '立即登入'
            });
            if (result.isConfirmed) {
                // dev環境下直接設置cookie
                if (this.$config.ENV === 'dev') {
                    location.href = this.$config.API_URL;
                    if (this.$config.ENV === 'dev') {
                        this.$Cookies.set('_user_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6MTkwODIyfQ.eyJpZGVudGl0eSI6eyJvYmplY3RJZCI6InZ4SlNBNHZYakIiLCJtZW1iZXJfaWQiOiJrZEdWUDQiLCJzb3VyY2UiOiJ2aWRvbCIsImVtYWlsVmVyaWZpZWQiOmZhbHNlfSwiaXNzIjoidmlkb2wudHYiLCJpYXQiOjE2MDAzMDA4NzAsImV4cCI6MTYwMDkwNTY3MH0.5ZLvoYYxJlh_W-g2OjW9aUD-aLZ72kA0B8oSJRQ8MAfeohr6MszshoK8AZwwSMOUXnGtZXHr814ggVUlGQ9jRg');
                    }
                    return;
                }

                this.$Cookies.set('user_signed_in_redirect_to', location.origin + location.pathname, { expires: 1 });
                const redirectUrl = {
                    sit: 'https://webtest.vidol.tv/login',
                    prod: 'https://vidol.tv/login'
                };
                location.href = redirectUrl[this.$config.ENV];
            }
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
