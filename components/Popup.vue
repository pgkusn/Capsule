<template>
    <div class="popup">
        <div class="popup__content">
            <div class="popup__close" @click="closePopup" />
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
    padding: 10px;
    @media (min-width: #{$tablet-width + 1}px) {
        padding: 30px;
    }
    &__content {
        position: relative;
        z-index: 1;
        margin: auto;
        max-width: 1180px;
        width: 100%;
    }
    &__close {
        position: absolute;
        top: 5px;
        right: 5px;
        display: flex;
        width: 40px;
        height: 40px;
        border: 4px solid #000;
        border-radius: 50%;
        background-color: #fff;
        cursor: pointer;
        transform: rotate(45deg);
        @media (min-width: #{$tablet-width + 1}px) {
            width: 50px;
            height: 50px;
            border-width: 5px;
        }
        &::before,
        &::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            width: 20px;
            height: 3px;
            border-radius: 2px;
            background-color: #000;
            content: '';
            @media (min-width: #{$tablet-width + 1}px) {
                width: 25px;
                height: 4px;
            }
        }
        &::before {
            transform: rotate(90deg);
        }
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
