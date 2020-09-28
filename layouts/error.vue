<template>
    <div class="error">
        <h1 v-if="error.statusCode === 404">
            頁面不存在
        </h1>
        <h1 v-else>
            {{ error.message }}
        </h1>
    </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'default'
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';

.error {
    padding-top: 3em;
}
h1 {
    text-align: center;
    font-weight: bold;
    font-size: 26px;
    @media (min-width: #{$tablet-width + 1}px) {
        font-size: 32px;
    }
}
</style>
