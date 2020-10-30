<template>
    <div class="app" :class="{ 'is-mobile': isMobile, 'opening': !ignoreOpening, loaded }">
        <div class="app__content">
            <a href="https://vidol.tv/" target="_blank" class="logo fadeIn" />
            <nuxt />
        </div>
        <VueFooter ref="footer" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import VueFooter from '@/components/VueFooter';

export default {
    name: 'App',
    components: {
        VueFooter
    },
    data () {
        return {
            mainBg: null
        };
    },
    computed: {
        ...mapState(['ignoreOpening', 'loaded']),
        isMobile () {
            return this.$device.isMobile;
        }
    },
    mounted () {
        this.mediaSensor(768, 'tablet');
        this.mediaSensor(414, 'mobile');
    },
    methods: {
        mediaSensor (minWidth, deviceType) {
            const resizeWidth = pMatchMedia =>
                this.$store.commit('updateDevice', { deviceType, value: pMatchMedia.matches });
            const mm = window.matchMedia(`(max-width: ${minWidth}px)`);
            mm.addListener(resizeWidth);
            resizeWidth(mm);
        }
    }
};
</script>

<style lang="scss">
@import '@/assets/sass/reset';
@import '@/assets/sass/common';

html,
body,
#__nuxt,
#__layout,
.app,
.app__content {
    height: 100%;
}
body {
    overflow: hidden;
    min-width: 375px;
}
.page-enter-active,
.page-leave-active {
    transition: opacity .3s;
}
.page-enter,
.page-leave-active {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.container {
    margin: 0 auto;
    max-width: #{$content-width}px;
}
.video-container {
    @extend %youtube-iframe;
}
.app {
    position: relative;
    margin: 0 auto;
    background-color: rgb(50, 70, 245);
    transition: background-color .2s; // Loader fadeout 0.2s
    &.loaded {
        background-color: #fff9eb;
    }
    &__content {
        padding-bottom: 80px;
        @media (max-width: #{$tablet-width}px) {
            padding-bottom: 45px;
        }
    }
}
.logo {
    position: absolute;
    top: vw(11, $desktop-width);
    left: vw(22, $desktop-width);
    z-index: 10;
    width: vw(185, $desktop-width);
    background: url('~@/assets/images/logo.png') 0 50% / contain no-repeat;
    @media (max-width: #{$tablet-width}px) {
        width: vw(128, $tablet-width);
    }
    &::before {
        display: block;
        padding-top: percentage(48 / 137);
        content: '';
    }
}
.fadeIn {
    animation: fadeIn .5s both paused;
    @at-root {
        .app.opening .fadeIn {
            animation-delay: 4s;
        }
        .app.loaded .fadeIn {
            animation-play-state: running;
        }
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.bounceIn {
    animation: popup .5s cubic-bezier(.34, 1.56, .64, 1) 2.5s both paused;
    @at-root {
        .app.loaded .bounceIn {
            animation-play-state: running;
        }
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
.swal2-title {
    @media (max-width: #{$tablet-width}px) {
        font-size: 1.7em !important;
    }
}
#nprogress {
    .bar {
        background-color: #fff !important;
    }
    .spinner-icon {
        border-top-color: #fff !important;
        border-left-color: #fff !important;
    }
    .peg {
        box-shadow: 0 0 10px #fff, 0 0 5px #fff !important;
    }
}
</style>
