<template>
    <div class="partInput">

        <mt-cell class="itemTxt" title="供货厂家编号" :value="item.ProvItemNo"></mt-cell>
        <mt-cell class="itemTxt" title="主机编号" :value="item.EngineNo"></mt-cell>
        <mt-field class="inputRight required" label="开单价格" type="number" placeholder="请输入" v-model="item.OrgSalePrice"></mt-field>
        <div @click="$refs.pickerPriceLog.open('bzh001')" class="hasInput required">
            <mt-cell title="实际销售单价" is-link value="请选择">
                <input type="number" placeholder="请选择或输入" v-model="item.SalePrice" v-on:click.stop.prevent>
            </mt-cell>
        </div>
        <mt-field class="inputRight required" type="number" label="销售数量" placeholder="请输入" v-model="item.SaleQty"></mt-field>

        <mt-cell class="itemTxt" title="配件名称" :value="item.Item_C_Name"></mt-cell>
        <mt-cell class="itemTxt" title="配件规格" :value="item.Item_C_Spec"></mt-cell>
        <mt-cell class="itemTxt" title="车系代码" :value="item.UseInCarDesc"></mt-cell>
        <mt-cell class="itemTxt" title="适用车型" :value="item.UseInCarBrief"></mt-cell>
        <mt-cell class="itemTxt" title="计量单位" :value="item.C_Unit"></mt-cell>
        <mt-cell class="itemTxt" title="品牌" :value="item.Brand"></mt-cell>
        <mt-cell class="itemTxt" title="单箱数量" :value="item.UnitBoxQty"></mt-cell>
        <mt-cell class="itemTxt" title="发货仓库" :value="item.WHName"></mt-cell>
        <mt-cell class="itemTxt" title="库存量" :value="item.StockQty"></mt-cell>
        <mt-field class="inputRight" label="备注" placeholder="请输入备注" v-model="item.Memo"></mt-field>
        <view-price-log ref="pickerPriceLog"></view-price-log>

    </div>
</template>

<script>
import viewPriceLog from './viewPriceLog'

export default {
    name: 'partInput',
    props: ['item'],
    data() {
        return {

        }
    },
    created() {
        log(this.item)
    },
    methods: {

    },
    components: {
        'view-price-log': viewPriceLog

    },
    watch: {
        'item.SaleQty': function(newVal) {
            log(newVal)
            if(newVal == '33') {
                this.item.SaleQty = '8'
            }
        }
        // partData: {
        //     handler(curVal, oldVal) {
        //         log(curVal)
        //     },
        //     deep: true
        // }
    }
}
</script>

<style lang="less" scoped>

</style>