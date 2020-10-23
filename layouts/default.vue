<template>
    <div class="app" :class="{ 'is-mobile': isMobile }">
        <div class="app__content">
            <a
                href="https://vidol.tv/"
                target="_blank"
                class="logo"
                :class="{ fadeIn: !ignoreOpening }"
            />
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
        ...mapState(['ignoreOpening']),
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
body {
    height: 100%;
}
body {
    overflow: hidden;
    min-width: 375px;
    background-color: rgb(50, 70, 245);
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
    min-height: 100vh;
    &__content {
        padding-bottom: 80px;
        height: 100vh;
        @media (max-width: #{$tablet-width}px) {
            padding-bottom: 45px;
        }
    }
}
a.logo {
    position: absolute;
    top: vw(11, $desktop-width);
    left: vw(22, $desktop-width);
    z-index: 10;
    width: vw(185, $desktop-width);
    background: url('~@/assets/images/logo.png') 0 50% / contain no-repeat;
    @media (max-width: #{$tablet-width}px) {
        top: vw(21, $tablet-width);
        left: 50%;
        width: vw(128, $tablet-width);
        transform: translateX(-50%);
    }
    &::before {
        display: block;
        padding-top: percentage(48 / 137);
        content: '';
    }
}
.fadeIn {
    animation: fadeIn .5s 4s both;
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
