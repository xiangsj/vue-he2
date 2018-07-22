<template>
    <div class="partAdd">
        <mt-header title="配件添加">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <section>
            <div class="partAddList">
                <mt-cell title="供货厂家编号" value="说明文字"></mt-cell>
                <mt-cell title="主机编号" value="说明文字"></mt-cell>
                <mt-field class="inputRight required" label="开单价格" placeholder="请输入" v-model="partName"></mt-field>

                <mt-field class="inputRight required" label="销售数量" placeholder="请输入" v-model="partName"></mt-field>

                <div @click="$refs.pickerPriceLog.open('bzh001')" class="hasInput required">
                    <mt-cell title="实际销售单价" is-link value="请选择">
                        <input type="text" placeholder="请选择或输入" :value="partName" v-on:click.stop.prevent>
                    </mt-cell>
                </div>

                <mt-cell title="主机编号" value="说明文字"></mt-cell>
            </div>

        </section>
        <footer class="btnFooter btnNum2">
            <mt-button type="primary" @click="submit()">确定</mt-button>
            <mt-button @click="$router.go(-1)">取消</mt-button>
        </footer>
        <view-price-log ref="pickerPriceLog"></view-price-log>
    </div>
</template>

<script>
import { setCookie } from "@/libs/utils.js";
import viewPriceLog from './viewPriceLog'
export default {
    name: 'partAdd',
    data() {
        return {
            partName: ''
        }
    },
    methods: {
        submit() {
            let data = {
                aa: '11'
            }
            setCookie("partsObj", data);

            this.$router.push('/home/salesOrder')
        }
    },
    components: {
        'view-price-log': viewPriceLog
    }
}
</script>

<style lang="less" scoped>
.partAdd {
    // border: 1px solid red;
    // position: relative;
    // height: 100%;
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
        .partAddList {
            margin-bottom: 15px;
        }
    }
}
</style>