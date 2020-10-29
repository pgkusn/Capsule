<template>
    <div class="draw">
        <div v-if="drawRange" :class="popupClass" :style="{ backgroundImage: popupFileName && `url(images/popup-bg/${popupFileName}.jpg)` }">
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
        ...mapState(['tabletWidth', 'drawResult', 'drawRange']),
        popupClass () {
            if (this.drawRange.draw) {
                return 'is-drawn';
            }
            if (this.drawResult) {
                return this.drawResult.status === 'win' ? this.drawResult.reward : this.drawResult.status;
            }
            return '';
        },
        popupFileName () {
            return this.popupClass ? this.tabletWidth ? `${this.popupClass}-s` : this.popupClass : '';
        },
        popupBtn () {
            if (this.drawRange.draw) {
                return 'is-drawn';
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
            else if (this.drawResult.status === 'normal') {
                window.open('https://導方案頁');
            }
            else if (this.drawResult.status === 'lose') {
                window.open('https://導觀看連結');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

.draw {
    position: relative;
    > div {
        padding-top: percentage(757/1294);
        width: 100%;
        background-color: #fff;
        background-size: contain;
        @media (max-width: #{$tablet-width}px) {
            padding-top: percentage(1045/748);
        }
    }
    &__btn {
        position: absolute;
        @at-root {
            [class^=reward] .draw__btn {
                top: percentage(447/757);
                right: percentage(123/1294);
                width: percentage(455/1294);
                height: percentage(97/757);
                @media (max-width: #{$tablet-width}px) {
                    top: percentage(592/1045);
                    right: percentage(83/748);
                    width: percentage(582/748);
                    height: percentage(124/1045);
                }
            }
            .lose .draw__btn {
                top: percentage(448/757);
                right: percentage(60/1294);
                width: percentage(517/1294);
                height: percentage(93/757);
                @media (max-width: #{$tablet-width}px) {
                    top: percentage(577/1045);
                    right: percentage(44/748);
                    width: percentage(661/748);
                    height: percentage(119/1045);
                }
            }
            .normal .draw__btn {
                top: percentage(448/757);
                right: percentage(147/1294);
                width: percentage(398/1294);
                height: percentage(94/757);
                @media (max-width: #{$tablet-width}px) {
                    top: percentage(650/1045);
                    right: percentage(120/748);
                    width: percentage(506/748);
                    height: percentage(120/1045);
                }
            }
            .is-drawn .draw__btn {
                top: percentage(450/757);
                right: percentage(60/1294);
                width: percentage(517/1294);
                height: percentage(93/757);
                @media (max-width: #{$tablet-width}px) {
                    top: percentage(650/1045);
                    right: percentage(120/748);
                    width: percentage(506/748);
                    height: percentage(120/1045);
                }
            }
        }
    }
}
</style>
