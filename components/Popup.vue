<template>
    <div class="popup">
        <div class="popup__content">
            <div id="popupClose" class="popup__close" @click="closePopup" />
            <slot />
        </div>
        <div class="popup__overlay" @click="closePopup" />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Popup',
    model: {
        event: 'closePopup'
    },
    computed: {
        ...mapState(['loading'])
    },
    methods: {
        ...mapMutations(['setCurrentPopup']),
        closePopup () {
            if (this.loading) return;
            this.setCurrentPopup(null);
            this.$emit('closePopup', false);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

.popup {
    position: fixed !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: map-get($z-index, popup);
    display: flex;
    overflow: auto;
    &__content {
        @include vw-size(1920, 1294);
        position: relative;
        top: -40px; // footer height / 2
        z-index: 1;
        margin: auto;
        @media (max-width: #{$tablet-width}px) {
            top: -22.5px; // footer height / 2
        }
    }
    &__close {
        @include vw-size(1920, 100, 100);
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 50%;
        cursor: pointer;
        // background-color: rgba(#000, .5);
        // display: flex;
        // box-sizing: content-box;
        // border: vw(10, 1920) solid #ed2828;
        // transform: rotate(45deg);
        // &::before,
        // &::after {
        //     @include vw-size(1920, 53, 10);
        //     position: absolute;
        //     top: 0;
        //     right: 0;
        //     bottom: 0;
        //     left: 0;
        //     margin: auto;
        //     border-radius: 5px;
        //     background-color: #fff;
        //     content: '';
        // }
        // &::before {
        //     transform: rotate(90deg);
        // }
    }
    &__overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(#000, .75);
        content: '';
    }
}
</style>
