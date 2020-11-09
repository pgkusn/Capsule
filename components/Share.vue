<template>
    <div class="share">
        <div v-if="drawRange" :class="popupClass" :style="{ backgroundImage: popupFileName && `url(images/popup-bg/${popupFileName}.jpg)` }">
            <a href class="share__btn" @click.prevent="fbShare">
                <img src="@/assets/images/share_fb.png" alt="">
            </a>
        </div>
        <div v-else>
            <Loading class="draw__loading" />
        </div>
    </div>
</template>

<script>
/* eslint-disable no-undef */
import { mapState, mapMutations, mapActions } from 'vuex';
import Loading from '@/components/Loading.vue';

export default {
    name: 'Share',
    components: {
        Loading
    },
    computed: {
        ...mapState(['tabletWidth', 'drawRange']),
        popupClass () {
            return this.drawRange.draw && this.drawRange.share ? 'is-shared' : 'no-shared';
        },
        popupFileName () {
            return this.popupClass ? this.tabletWidth ? `${this.popupClass}-s` : this.popupClass : '';
        }
    },
    methods: {
        ...mapMutations(['setCurrentPopup']),
        ...mapActions(['share']),
        fbShare () {
            FB.ui(
                {
                    method: 'share',
                    display: 'popup',
                    href: location.hostname === 'localhost' ? 'https://vidol.tv/' : location.href
                },
                res => {
                    if (res && !res.error_message) {
                        this.shareSuccessCallback();
                    }
                    else {
                        console.log('Error while posting.');
                    }
                }
            );
        },
        async shareSuccessCallback () {
            if (!this.drawRange.draw) {
                this.setCurrentPopup('Draw');
            }
            else if (!this.drawRange.share) {
                await this.share();
                this.setCurrentPopup('Draw');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

.share {
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
        width: percentage(175/1294);
        height: percentage(85/757);
        @media (max-width: #{$tablet-width}px) {
            width: percentage(191/748);
            height: percentage(93/1045);
        }
        @at-root {
            .is-shared .share__btn {
                top: percentage(448/757);
                right: percentage(233/1294);
                @media (max-width: #{$tablet-width}px) {
                    top: percentage(657/1045);
                    right: percentage(277/748);
                }
            }
            .no-shared .share__btn {
                top: percentage(448/757);
                right: percentage(175/1294);
                @media (max-width: #{$tablet-width}px) {
                    top: percentage(657/1045);
                    right: percentage(277/748);
                }
            }
        }
    }
}
</style>
