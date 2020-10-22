<template>
    <div class="footer fadeIn">
        <div class="container">
            <div class="footer__text">
                <p>© 2020 Vidol All Rights Reserved</p>
                <p>版權所有 盜用必究</p>
            </div>
            <div class="footer__share">
                <a href class="footer__share--line" @click.prevent="lineShare">
                    <img src="@/assets/images/share_line.png" alt="">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VueFooter',
    methods: {
        lineShare () {
            window.open('http://line.naver.jp/R/msg/text/?台劇、華劇扭起來!11人歡樂看、11日體驗序號及超多折扣等你來扭：活動網址：' + location.origin + location.pathname);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

.footer {
    position: absolute;
    bottom: 0;
    z-index: 10;
    min-width: 375px;
    width: 100%;
    background-color: #472fff;
    color: #fff;
    > .container {
        display: flex;
        height: 80px;
        justify-content: space-between;
        align-items: center;
        @media (max-width: #{$content-width}px) {
            padding: 0 10px;
        }
        @media (max-width: #{$tablet-width}px) {
            height: 45px;
        }
        @media (max-width: #{$mobile-width}px) {
            padding: 0;
            justify-content: space-evenly;
        }
    }
    &__text {
        line-height: 1.6;
        @media (max-width: #{$tablet-width}px) {
            font-size: 12px;
        }
        > p {
            display: inline-block;
            margin-right: 1em;
            @media (max-width: #{$mobile-width}px) {
                display: block;
            }
            @media (max-width: #{$mobile-width}px) {
                margin-right: 0;
            }
        }
    }
    &__share {
        display: flex;
        > a {
            width: 94px;
            @media (max-width: #{$tablet-width}px) {
                width: 50px;
            }
        }
    }
}
</style>
