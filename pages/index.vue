<template>
    <main>
        <h1>{{ jsonData && jsonData.text }}</h1>
    </main>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Index',
    computed: {
        ...mapState(['jsonData'])
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

h1 {
    position: absolute;
    top: 100px;
    right: 0;
    left: 0;
    color: #fff;
    text-align: center;
    font-size: 36px;
}
</style>
