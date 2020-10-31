<template>
    <div class="loader">
        <div class="loader__percentage">
            {{ progress }}%
        </div>
        <svg height="300" width="300">
            <circle
                class="loader__path"
                cx="150"
                cy="150"
                r="100"
                stroke="#fff"
                stroke-width="3"
                fill="none"
                transform-origin="50% 50%"
            />
        </svg>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    props: {
        progress: {
            type: Number,
            default: 0
        }
    },
    computed: {
        loaderPath () {
            return document.querySelector('.loader__path');
        },
        loaderPercentage () {
            return document.querySelector('.loader__percentage');
        }
    },
    watch: {
        progress () {
            this.updateLoader();
        }
    },
    methods: {
        updateLoader () {
            const LOADER_RADIUS = 100;
            const loaderCircumference = 2 * Math.PI * LOADER_RADIUS;
            const offset = (loaderCircumference * (100 - this.progress)) / 100;
            this.loaderPath.style['stroke-dashoffset'] = offset;
            this.loaderPercentage.textContent = `${Math.floor(this.progress)}%`;
        }
    }
};
</script>

<style lang="scss" scoped>
.loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    margin: auto;
    width: 300px;
    height: 300px;
    &__percentage {
        position: absolute;
        top: 50%;
        left: 50%;
        color: #fff;
        font-size: 26px;
        transform: translate(-50%, -50%);
    }
    &__path {
        transition: stroke-dashoffset .1s;
        stroke-dasharray: 629; // 2*PI*r
        stroke-dashoffset: 629; // 2*PI*r
    }
    > svg {
        transform: rotate(-90deg);
    }
}
</style>
