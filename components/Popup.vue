<template>
    <div class="popup">
        <div :id="currentPopup.toLowerCase()" class="popup__content">
            <slot />
            <button id="popupClose" class="popup__close" @click="closePopup" />
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
        ...mapState(['loading', 'currentPopup'])
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
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: map-get($z-index, popup);
    display: flex;
    overflow: auto;
    &__content {
        position: relative;
        z-index: 1;
        box-sizing: content-box;
        margin: auto;
        padding: 30px;
        width: percentage(1294/$desktop-width);
        @media (max-width: #{$tablet-width}px) {
            padding: 10px;
            width: percentage(353/$mobile-width);
        }
        &#warning {
            width: percentage(1600/$desktop-width);
            @media (max-width: #{$tablet-width}px) {
                width: percentage(353/$mobile-width);
            }
        }
    }
    &__close {
        position: absolute;
        top: 30px;
        right: 30px;
        max-width: 100px;
        max-height: 100px;
        width: percentage(100/1294);
        height: percentage(100/757);
        border-radius: 50%;
        @media (max-width: #{$tablet-width}px) {
            top: 10px;
            right: 10px;
            max-width: 130px;
            max-height: 130px;
            width: percentage(130/748);
            height: percentage(130/1045);
        }
        @at-root {
            .warning,
            .history {
                + .popup__close {
                    display: flex;
                    box-sizing: content-box;
                    width: 63px;
                    height: 63px;
                    transform: rotate(45deg);
                    &::before,
                    &::after {
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        margin: auto;
                        width: 38px;
                        height: 5px;
                        border-radius: 5px;
                        content: '';
                    }
                    &::before {
                        transform: rotate(90deg);
                    }
                }
            }
            .warning + .popup__close {
                top: 36px;
                right: 36px;
                background-color: #fff;
                @media (max-width: #{$tablet-width}px) {
                    top: 16px;
                    right: 16px;
                    width: 32px;
                    height: 32px;
                    border: 4px solid #9a9a9a;
                }
                &::before,
                &::after {
                    background-color: #9a9a9a;
                    @media (max-width: #{$tablet-width}px) {
                        width: 18px;
                        height: 2px;
                    }
                }
            }
            .history + .popup__close {
                top: 33px;
                right: 33px;
                border: 10px solid #472fff;
                background-color: #000;
                @media (max-width: #{$tablet-width}px) {
                    top: 13px;
                    right: 13px;
                    width: 43px;
                    height: 43px;
                    border: 8px solid #472fff;
                }
                &::before,
                &::after {
                    background-color: #fff;
                    @media (max-width: #{$tablet-width}px) {
                        width: 30px;
                        height: 5px;
                    }
                }
            }
        }
    }
    &__overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(#000, .65);
        content: '';
    }
}
</style>
