<template>
    <div class="loading-wrapper">
        <div class="ball-pulse">
            <div /><div /><div />
        </div>
    </div>
</template>

<script>
import 'loaders.css/loaders.min.css';

export default {
    name: 'Loading'
};
</script>

<style lang="scss" scoped>
.loading-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.ball-pulse-sync > div,
.ball-pulse > div,
.ball-scale > div {
    &:nth-child(1) {
        background-color: #0875df;
    }
    &:nth-child(2) {
        background-color: #ff33a6;
    }
    &:nth-child(3) {
        background-color: #ff6e0d;
    }
}
</style>
