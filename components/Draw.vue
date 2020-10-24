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
    position: relative;
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
                @include vw-size(1294, 455, 97);
                top: percentage(447/757);
                right: percentage(123/1294);
            }
            .lose .draw__btn {
                @include vw-size(1294, 517, 93);
                top: percentage(448/757);
                right: percentage(60/1294);
            }
            .normal .draw__btn {
                @include vw-size(1294, 398, 94);
                top: percentage(448/757);
                right: percentage(147/1294);
            }
            .goshare .draw__btn {
                @include vw-size(1294, 517, 93);
                top: percentage(450/757);
                right: percentage(60/1294);
            }
        }
    }
}
</style>
