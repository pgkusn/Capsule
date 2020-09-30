<template>
    <div class="history">
        <div v-if="history" class="history__content">
            <h1>我的中獎紀錄</h1>
            <p>{{ history.text }}</p>
        </div>
        <div v-else>
            loading..
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'History',
    computed: {
        ...mapState(['history'])
    }
};
</script>

<style lang="scss" scoped>
.history {
    display: flex;
    padding: 2rem;
    width: 100%;
    height: 50vh;
    background-color: #fff;
    font-size: 2rem;
    justify-content: center;
    align-items: center;
    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
p {
    font-size: 1.5rem;
}
h1 {
    margin-bottom: 1rem;
}
</style>
