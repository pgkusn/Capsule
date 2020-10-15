<template>
    <div class="gacha">
        <div>
            <div ref="lottieEl" class="gacha__lottie" :class="{ running: isReady }" />
            <video
                ref="video"
                class="gacha__bg"
                src="gacha-bg.mp4"
                muted
                playsinline
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import animationData from './data.json';

export default {
    name: 'Gacha',
    computed: {
        ...mapState(['isReady'])
    },
    watch: {
        isReady (value) {
            if (value) {
                this.$refs.video.play();
            }
        }
    },
    mounted () {
        const anim = this.$lottie.loadAnimation({
            container: this.$refs.lottieEl,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            animationData
        });
        setTimeout(() => {
            anim.play();
        }, 4000); // 3秒的 css animation delay + 1秒
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

.gacha {
    position: absolute;
    right: 0;
    bottom: 100px;
    left: 0;
    margin: 0 auto;
    max-width: 450px;
    > div {
        padding-top: percentage(540/960);
        width: 100%;
    }
    &__lottie {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: map-get($z-index, gacha-svg);
        animation: popup .5s cubic-bezier(.34, 1.56, .64, 1) 3s both paused;
        &.running {
            animation-play-state: running;
        }
    }
    &__bg {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 100%;
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
</style>
