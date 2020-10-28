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
    @media (max-width: #{$tablet-width}px) {
        padding: 13px 0 31px;
        border-width: 13px;
    }
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
            @media (max-width: #{$tablet-width}px) {
                width: 200px;
            }
        }
        > h2 {
            margin: 10px 0;
            width: 211px;
            @media (max-width: #{$tablet-width}px) {
                width: 106px;
            }
        }
        > h3 {
            font-size: 20px;
            font-family: 'Noto Sans TC', sans-serif;
            @media (max-width: #{$tablet-width}px) {
                font-size: 16px;
            }
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
            @media (max-width: #{$tablet-width}px) {
                font-size: 14px;
            }
        }
        tbody {
            tr + tr {
                margin-top: 4px;
            }
            td {
                position: relative;
                padding: 10px 5px;
                vertical-align: middle;
                font-size: 18px;
                @media (max-width: #{$tablet-width}px) {
                    font-size: 12px;
                }
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
                            @media (max-width: #{$tablet-width}px) {
                                border-radius: 0;
                            }
                        }
                        .history__list tbody td:last-child::before {
                            border-radius: 0 10px 10px 0;
                            @media (max-width: #{$tablet-width}px) {
                                border-radius: 0;
                            }
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
            @media (max-width: #{$tablet-width}px) {
                width: 30px;
                height: 30px;
            }
            &.checked::before {
                display: block;
                width: 34px;
                height: 30px;
                background-image: url('~@/assets/images/history-status.png');
                background-size: contain;
                content: '';
                transform: translate(5px, -5px);
                @media (max-width: #{$tablet-width}px) {
                    width: 28px;
                    height: 25px;
                }
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
                @media (max-width: #{$tablet-width}px) {
                    width: 30px;
                    height: 30px;
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
            @media (max-width: #{$tablet-width}px) {
                width: 26px;
                height: 26px;
            }
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
