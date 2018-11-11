<template>
    <div class="accountHome">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: 'accountHome'
}
</script>

<style lang="less" scoped>
.accountHome{
    height: 100%;
}
</style>
