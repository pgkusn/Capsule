<template>
    <div class="footer">
        <div class="container">
            <div class="footer__text">
                <p>© 2020 Vidol All Rights Reserved</p>
                <p>版權所有 盜用必究</p>
            </div>
            <div class="footer__share">
                <a href class="footer__share--fb" @click.prevent="FBShare">
                    <img src="./images/share_fb.png" alt="">
                </a>
                <a href class="footer__share--line" @click.prevent="lineShare">
                    <img src="./images/share_line.png" alt="">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VueFooter',
    mounted () {
        this.fbInit();
    },
    methods: {
        fbInit () {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '1044817312247946',
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
        FBShare () {
            FB.ui(
                {
                    method: 'share',
                    display: 'popup',
                    href: location.href
                },
                function (response) {
                    if (response && !response.error_message) {
                        alert('Posting completed.');
                    }
                    else {
                        alert('Error while posting.');
                    }
                }
            );
        },
        lineShare () {
            const description = document.querySelector('meta[name=description]')
                .content;
            window.open(
                'http://line.naver.jp/R/msg/text/?' +
                    description +
                    '：活動網址： ' +
                    location.origin +
                    location.pathname
            );
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
    background-color: #000;
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
            + a {
                margin-left: 20px;
                @media (max-width: #{$tablet-width}px) {
                    margin-left: 15px;
                }
            }
        }
    }
}
</style>
