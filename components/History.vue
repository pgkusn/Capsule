<template>
    <div class="history">
        <div v-if="history">
            <hgroup class="history__title">
                <h1><img src="@/assets/images/title.png" alt="1111 驚喜扭扭樂"></h1>
                <h2><img src="@/assets/images/history-subtitle.png" alt="我的中獎紀錄"></h2>
                <h3>會員ＩＤ（帶入登錄ＩＤ）</h3>
            </hgroup>
            <table class="history__list">
                <thead>
                    <tr>
                        <th>中獎獎項</th>
                        <th>中獎序號</th>
                        <th>兌換狀態</th>
                        <th>兌換連結</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in history" :key="item.number">
                        <td>
                            <div>{{ item.reward }}</div>
                        </td>
                        <td>
                            <div>{{ item.number }}</div>
                        </td>
                        <td>
                            <div class="history__list--status" :class="{checked: item.exchange}" />
                        </td>
                        <td>
                            <div class="history__list--link">
                                <a :href="item.url" target="_blank" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <Loading class="draw__loading" />
        </div>
        <ul class="history__cube">
            <li />
            <li />
            <li />
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from '@/components/Loading.vue';

export default {
    name: 'History',
    components: {
        Loading
    },
    computed: {
        ...mapState(['history'])
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
$base-color: #472fff;

.history {
    position: relative;
    padding: 35px 60px;
    border-width: 13px 20px;
    border-style: solid;
    border-color: $base-color;
    background-color: #fff;
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__title {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        align-items: center;
        > h1 {
            width: 442px;
        }
        > h2 {
            margin: 10px 0;
            width: 211px;
        }
        > h3 {
            font-size: 20px;
            font-family: 'Noto Sans TC', sans-serif;
        }
    }
    &__list {
        width: 100%;
        table-layout: fixed;
        text-align: center;
        th {
            padding-bottom: 10px;
            letter-spacing: letter-spacing(50);
            font-size: 25px;
        }
        tbody {
            tr + tr {
                margin-top: 4px;
            }
            td {
                position: relative;
                padding: .5em;
                vertical-align: middle;
                font-size: 18px;
                &::before {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: calc(100% - 5px);
                    background-color: #e6e6e6;
                    content: '';
                    transform: translateY(-50%);
                    @at-root {
                        .history__list tbody tr:nth-child(even) td::before {
                            background-color: #c1c1c1;
                        }
                        .history__list tbody td:first-child::before {
                            border-radius: 10px 0  0 10px;
                        }
                        .history__list tbody td:last-child::before {
                            border-radius: 0 10px 10px 0;
                        }
                    }
                }
                > div {
                    position: relative;
                    z-index: 1;
                }
            }
        }
        &--status {
            margin: 0 auto;
            width: 35px;
            height: 35px;
            border: 3px solid $base-color;
            border-radius: 50%;
            &.checked::before {
                display: block;
                width: 34px;
                height: 30px;
                background-image: url('~@/assets/images/history-status.png');
                content: '';
                transform: translate(5px, -5px);
            }
        }
        &--link {
            > a {
                display: block;
                margin: 0 auto;
                width: 37px;
                height: 37px;
                background-image: url('~@/assets/images/history-link@2x.png');
                background-size: contain;
                @media (min-resolution: 2dppx) {
                    background-image: url('~@/assets/images/history-link@2x.png');
                }
                @media (min-resolution: 3dppx) {
                    background-image: url('~@/assets/images/history-link@3x.png');
                }
            }
        }
    }
    &__cube {
        > li {
            position: absolute;
            width: 36px;
            height: 36px;
            background-color: $base-color;
            &:nth-child(1) {
                top: 0;
                left: 0;
            }
            &:nth-child(2) {
                bottom: 0;
                left: 0;
            }
            &:nth-child(3) {
                right: 0;
                bottom: 0;
            }
        }
    }
}
</style>
