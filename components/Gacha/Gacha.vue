<template>
    <div class="gacha" />
</template>

<script>
import animationData from './data.json';

export default {
    name: 'Gacha',
    mounted () {
        const anim = this.$lottie.loadAnimation({
            container: this.$el,
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
    top: 0;
    left: 0;
    z-index: map-get($z-index, gacha-svg);
    animation: popup .5s cubic-bezier(.34, 1.56, .64, 1) 3s both;
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
