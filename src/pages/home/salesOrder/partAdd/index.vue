<template>
    <div class="partAdd">
        <mt-header title="配件添加">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <section>
            <mt-cell title="供货厂家编号" value="说明文字"></mt-cell>
            <mt-cell title="主机编号" value="说明文字"></mt-cell>
            <mt-field class="inputRight" label="开单价格" placeholder="请输入" v-model="partName"></mt-field>

            <mt-field class="inputRight" label="销售数量" placeholder="请输入" v-model="partName"></mt-field>
            <mt-cell title="主机编号" value="说明文字"></mt-cell>
            <mt-cell title="主机编号" value="说明文字"></mt-cell>
            <mt-cell title="主机编号" value="说明文字"></mt-cell>
            <mt-cell title="主机编号" value="说明文字"></mt-cell>
        </section>
        <footer class="btnFooter btnNum2">
            <mt-button type="primary" @click="submit()">查询</mt-button>
            <mt-button @click="clear()">清空</mt-button>
        </footer>

    </div>
</template>

<script>
export default {
    name: 'partAdd',
    data() {
        return {
            partName: ''
        }
    },
    methods: {
        submit() { },
        clear() { }
    }
}
</script>

<style lang="less" scoped>
.partAdd {
    height: 100%;
    section {
        // border: 1px solid red;
        background-color: #f7f8f9;
        overflow: auto;
        position: absolute;
        left: 0;
        top: 40px;
        right: 0;
        bottom: 62px;
        padding-bottom: 30px;
    }
}
</style>