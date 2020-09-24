<template>
    <div class="app" :class="{ 'is-mobile': isMobile, 'is-ready': isReady }" :style="{ backgroundImage: mainBg }">
        <div class="app__content">
            <a href="https://vidol.tv/" target="_blank" class="logo" />
            <nuxt />
        </div>
        <VueFooter ref="footer" />
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import VueFooter from '@/components/VueFooter/VueFooter';

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
        ...mapState(['tabletWidth', 'isReady']),
        isMobile () {
            return this.$device.isMobile;
        },
        bgImg () {
            return this.tabletWidth ? 'images/bg-m.jpg' : 'images/bg.jpg';
        }
    },
    watch: {
        tabletWidth (isTablet) {
            this.mainBg = `url(images/bg${isTablet ? '-m' : ''}.jpg)`;
        }
    },
    mounted () {
        this.mediaSensor(768, 'tablet');
        this.mediaSensor(414, 'mobile');

        this.$nextTick(async () => {
            this.$nuxt.$loading.start();
            await this.getJsonData();
            await this.preloadImg([this.bgImg]);
            this.setReady();
            this.$nuxt.$loading.finish();
        });
    },
    methods: {
        ...mapMutations(['setReady']),
        ...mapActions(['preloadImg', 'getJsonData']),
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
    min-width: 375px;
}
.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s;
}
.page-enter,
.page-leave-active {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
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
    background: 50% 0 / cover;
    opacity: 0;
    transition: opacity 0.5s;
    &.is-ready {
        opacity: 1;
    }
    &__content {
        padding-bottom: 80px;
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
</style>
