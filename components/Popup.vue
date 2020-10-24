<template>
    <div class="popup">
        <div class="popup__content">
            <slot />
            <div id="popupClose" class="popup__close" @click="closePopup" />
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
        max-width: 1294px;
        width: 100%;
    }
    &__close {
        position: absolute;
        top: 36px;
        right: 36px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        cursor: pointer;
        @at-root {
            .warning + .popup__close {
                display: flex;
                box-sizing: content-box;
                width: 63px;
                height: 63px;
                background-color: #fff;
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
                    background-color: #9a9a9a;
                    content: '';
                }
                &::before {
                    transform: rotate(90deg);
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
        background-color: rgba(#000, .75);
        content: '';
    }
}
</style>
