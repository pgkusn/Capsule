<template>
    <div class="record">
        <div v-if="jsonData" class="record__content">
            <h1>我的中獎紀錄</h1>
            <p>中獎紀錄</p>
        </div>
        <div v-else>
            loading..
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Record',
    computed: {
        ...mapState(['jsonData'])
    }
};
</script>

<style lang="scss" scoped>
.record {
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
