<template>
    <div class="result">
        <div v-if="jsonData" class="result__content">
            <div v-if="win" class="result__win">
                <p>恭喜中獎 🎉</p>
                <button @click="setCurrentPopup('Record')">
                    查看中獎記錄
                </button>
            </div>
            <div v-else class="result__lose">
                <p>銘謝惠顧 😢</p>
                <button @click="setCurrentPopup('Share')">
                    分享再扭一次
                </button>
            </div>
        </div>
        <div v-else>
            loading..
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Result',
    data () {
        return {
            win: null
        };
    },
    computed: {
        ...mapState(['jsonData'])
    },
    mounted () {
        const result = Math.random() > 0.5;
        this.win = result;
        console.log(`win: ${this.win}`);
    },
    methods: {
        ...mapMutations(['setCurrentPopup'])
    }
};
</script>

<style lang="scss" scoped>
.result {
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
