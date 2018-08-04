<template>
    <div class="partEdit popupSelect">
        <mt-popup v-model="popupVisible" position="right" class="modelRight">
            <mt-header title="修改配件">
                <router-link to="" slot="left">
                    <mt-button icon="back" @click="popupVisible = false">返回</mt-button>
                </router-link>
            </mt-header>
            <section v-if="popupVisible">
                <mt-cell class="itemTxt" title="供货厂家编号" :value="currentArr.ProvItemNo"></mt-cell>
                <mt-cell class="itemTxt" title="主机编号" :value="currentArr.EngineNo"></mt-cell>
                <mt-field class="inputRight required" label="开单价格" placeholder="请输入" v-model="currentArr.OrgSalePrice"></mt-field>
            
                <mt-field class="inputRight required" label="实际销售单价" placeholder="请输入" v-model="currentArr.SalePrice"></mt-field>
                <mt-field class="inputRight required" label="销售数量" placeholder="请输入" v-model="currentArr.SaleQty"></mt-field>

                <mt-cell class="itemTxt" title="配件名称" :value="currentArr.Item_C_Name"></mt-cell>
                <mt-cell class="itemTxt" title="配件规格" :value="currentArr.Item_C_Spec"></mt-cell>
                <mt-cell class="itemTxt" title="车系代码" :value="currentArr.UseInCarDesc"></mt-cell>
                <mt-cell class="itemTxt" title="适用车型" :value="currentArr.UseInCarBrief"></mt-cell>
                <mt-cell class="itemTxt" title="计量单位" :value="currentArr.C_Unit"></mt-cell>
                <mt-cell class="itemTxt" title="品牌" :value="currentArr.Brand"></mt-cell>
                <mt-cell class="itemTxt" title="单箱数量" :value="currentArr.UnitBoxQty"></mt-cell>
                <mt-cell class="itemTxt" title="发货仓库" :value="currentArr.WHName"></mt-cell>
                <mt-cell class="itemTxt" title="库存量" :value="currentArr.StockQty"></mt-cell>
                <mt-field class="inputRight" label="备注" placeholder="请输入备注" v-model="currentArr.Memo"></mt-field>
                <!-- {{currentArr}} -->
            </section>
            <div class="buttonFoot">
                <mt-button size="large" type="primary" @click="surePopup()">确定</mt-button>
            </div>
        </mt-popup>
    </div>
</template>

<script>
export default {
    name: 'partEdit',
    model: {
        prop: 'msg',
        event: 'change'
    },
    props: {
        msg: {}
    },
    data() {
        return {
            popupVisible: false,
            flag: null,
            newPropAll: [],
            currentArr: {
                ProvItemNo: ''
            }// 当前选中项
        }
    },
    created() {

    },
    methods: {
        open(index) {
            this.flag = index
            this.popupVisible = true
            this.currentArr = this.msg[index]
            this.newPropAll = this.msg
            // log(index)
            // log(this.msg)
            // // log(this.propAll)
            // log(this.currentArr)
        },
        surePopup() {
            this.popupVisible = false
            this.popupArr = [] // 清空搜索
            this.newPropAll[this.flag] = this.currentArr
            this.$emit('change', this.newPropAll)
            // log(this.newPropAll)
        }
    }
}
</script>
