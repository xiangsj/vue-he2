<template>
    <div class="home">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: 'home'
}
</script>
