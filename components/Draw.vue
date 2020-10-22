<template>
    <div class="draw">
        <div v-if="drawRange" :class="popupClass" :style="{ backgroundImage: popupClass && `url(images/popup-bg/${popupClass}.jpg)` }">
            <button class="draw__btn" @click="popupBtnOnClick">
                <img v-if="popupBtn" :src="require(`@/assets/images/popup-btn/${popupBtn}.png`)">
            </button>
        </div>
        <div v-else>
            <Loading class="draw__loading" />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Loading from '@/components/Loading.vue';

export default {
    name: 'Draw',
    components: {
        Loading
    },
    computed: {
        ...mapState(['drawResult', 'drawRange']),
        popupClass () {
            if (this.drawRange.draw) {
                return 'goshare';
            }
            if (this.drawResult) {
                return this.drawResult.status === 'win' ? this.drawResult.reward : this.drawResult.status;
            }
            return '';
        },
        popupBtn () {
            if (this.drawRange.draw) {
                return 'goshare';
            }
            if (this.drawResult) {
                return this.drawResult.status;
            }
            return '';
        }
    },
    methods: {
        ...mapMutations(['setCurrentPopup']),
        popupBtnOnClick () {
            if (this.drawRange.draw) {
                this.setCurrentPopup('Share');
            }
            else if (this.drawResult.status === 'win') {
                this.setCurrentPopup('History');
            }
            else if (this.drawResult.status === 'lose') {
                window.open('https://導觀看連結');
            }
            else if (this.drawResult.status === 'normal') {
                window.open('https://導方案頁');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

.draw {
    > div {
        padding-top: percentage(757/1294);
        width: 100%;
        background-color: #fff;
        background-size: contain;
    }
    &__btn {
        position: absolute;
        @at-root {
            [class^=reward] .draw__btn {
                @include vw-size(1920, 455, 97);
                top: vw(447, 1920);
                right: vw(123, 1920);
                @media (min-width: #{$desktop-width + 1}px) {
                    top: 447px;
                    right: 123px;
                }
            }
            .lose .draw__btn {
                @include vw-size(1920, 517, 93);
                top: vw(448, 1920);
                right: vw(60, 1920);
                @media (min-width: #{$desktop-width + 1}px) {
                    top: 448px;
                    right: 60px;
                }
            }
            .normal .draw__btn {
                @include vw-size(1920, 398, 94);
                top: vw(448, 1920);
                right: vw(147, 1920);
                @media (min-width: #{$desktop-width + 1}px) {
                    top: 448px;
                    right: 147px;
                }
            }
            .goshare .draw__btn {
                @include vw-size(1920, 517, 93);
                top: vw(450, 1920);
                right: vw(60, 1920);
                @media (min-width: #{$desktop-width + 1}px) {
                    top: 450px;
                    right: 60px;
                }
            }
        }
    }
}
</style>
