<template>
    <div class="draw">
        <template v-if="drawResult && drawRange">
            <div v-if="drawRange.draw">
                <p>今天抽過了</p>
                <button @click="setCurrentPopup('Share')">
                    再去扭一次
                </button>
            </div>
            <div v-else-if="drawResult.status === 'win'">
                <p>恭喜中獎 🎉</p>
                <button @click="setCurrentPopup('History')">
                    查看中獎記錄
                </button>
            </div>
            <div v-else-if="drawResult.status === 'lose'">
                <p>銘謝惠顧 😢</p>
                <a href="">追劇去</a>
            </div>
            <div v-else>
                <p>Vidol 超狂限定優惠</p>
                <a href="">領優惠</a>
            </div>
        </template>
        <template v-else>
            loading..
        </template>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Draw',
    computed: {
        ...mapState(['drawResult', 'drawRange'])
    },
    methods: {
        ...mapMutations(['setCurrentPopup'])
    }
};
</script>

<style lang="scss" scoped>
.draw {
    display: flex;
    padding: 2rem;
    width: 100%;
    height: 50vh;
    background-color: #fff;
    text-align: center;
    font-size: 2rem;
    justify-content: center;
    align-items: center;
}
p {
    margin-bottom: .5rem;
}
button {
    all: revert;
}
</style>
