<template>
    <div class="stockHome">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: 'stockHome'
}
</script>

<style lang="less" scoped>
.stockHome{
    height: 100%;
}
</style>
