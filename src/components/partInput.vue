<template>
    <div class="partInput">

        <mt-cell class="itemTxt" title="供货厂家编号" :value="item.ProvItemNo"></mt-cell>
        <mt-cell class="itemTxt" title="主机编号" :value="item.EngineNo"></mt-cell>
        <!-- <mt-field class="inputRight required" label="开单价格" type="number" placeholder="请输入" v-model="item.OrgSalePrice"></mt-field> -->
        <div class="hasInput required">
            <mt-cell title="开单价格" value="请选择">
                <input type="number" @keydown="handleInput2" placeholder="请输入" v-model="item.OrgSalePrice" v-on:click.stop.prevent>
            </mt-cell>
        </div>
        <div @click="$refs.pickerPriceLog.open(item.ProvItemNo)" class="hasInput required">
            <mt-cell title="实际销售单价" is-link value="请选择">
                <input type="number" @keydown="handleInput2" placeholder="请输入或查看" v-model="item.SalePrice" v-on:click.stop.prevent>
            </mt-cell>
        </div>
        <div class="hasInput required">
            <mt-cell title="销售数量" value="请选择">
                <input type="number" @keydown="handleInput" placeholder="请输入" v-model="item.SaleQty" v-on:click.stop.prevent>
            </mt-cell>
        </div>
        <!-- <mt-field class="inputRight required" type="number" label="销售数量" placeholder="请输入" v-model="item.SaleQty"></mt-field> -->

        <mt-cell class="itemTxt" title="配件名称" :value="item.Item_C_Name"></mt-cell>
        <mt-cell class="itemTxt" title="配件规格" :value="item.Item_C_Spec"></mt-cell>
        <mt-cell class="itemTxt" title="车系代码" :value="item.UseInCarDesc"></mt-cell>
        <mt-cell class="itemTxt" title="适用车型" :value="item.UseInCarBrief"></mt-cell>
        <mt-cell class="itemTxt" title="计量单位" :value="item.C_Unit"></mt-cell>
        <mt-cell class="itemTxt" title="品牌" :value="item.Brand"></mt-cell>
        <mt-cell class="itemTxt" title="单箱数量" :value="Number(item.UnitBoxQty).toFixed(0)"></mt-cell>
        <!-- <mt-cell class="itemTxt" title="发货仓库" :value="item.WHName"></mt-cell> -->
        <div @click="$refs.pickerStore.open()">
            <mt-cell class="required" title="发货仓库" is-link value="请选择">
                <span class="value" v-if="item.WHName !== ''">{{item.WHName}}</span>
            </mt-cell>
        </div>
        <div @click="$refs.pickerPosition.open(item.WHID)">
            <mt-cell class="" title="仓库库位" is-link value="请选择">
                <span class="value" v-if="item.WHPosName !== ''">{{item.WHPosName}}</span>
            </mt-cell>
        </div>
        <mt-cell class="itemTxt" title="库存量" :value="item.StockQty"></mt-cell>
        <mt-field class="inputRight" label="备注" placeholder="请输入备注" v-model="item.Memo"></mt-field>
        <!-- 价格展示 -->
        <view-price-log ref="pickerPriceLog"></view-price-log>
        <!-- 选择仓库 -->
        <select-store v-model="storeObj" ref="pickerStore"></select-store>
        <!-- 选择库位 -->
        <select-position v-model="positionObj" ref="pickerPosition"></select-position>
    </div>
</template>

<script>
import viewPriceLog from './viewPriceLog'
import selectStore from './selectStore'
import selectPosition from './selectPosition'

export default {
    name: 'partInput',
    props: ['item'],
    data() {
        return {
            storeObj: {
                WHID: '',
                WHName: ''
            },
            positionObj: {
                WHPosID: '',
                WHPosName: ''
            },
            account: JSON.parse(this.$getCookie('account'))
        }
    },
    created() {
        // log(this.item)
    },
    methods: {
        handleInput(e) {
            // log(e.target.value)
            e.target.value=e.target.value.replace(/[^\d]/g,'');
        },
        handleInput2(e) {
            log(e.target.value)
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
        },
        // 更新库存 1
        updateStore(val) {
            let data = {
                fid: this.account.fid,
                provItemNo: this.item.ProvItemNo,
                whId: val
            }
            this.$http.get('/api/WarehouseSelectReturn', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let list = res.data.DataList;
                    console.log(list)
                    this.item.StockQty = list.StockQty
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
        // 更新库存 2
        updatePosition(val) {
            let data = {
                fid: this.account.fid,
                provItemNo: this.item.ProvItemNo,
                whId: this.item.WHID,
                whPosId: val
            }
            this.$http.get('/api/WharePosSelectReturn', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let list = res.data.DataList;
                    // console.log(list)
                    // log(typeof list)
                    this.item.StockQty = isNaN(list.length) ? list.StockQty : list[0].StockQty
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        }
    },
    components: {
        'view-price-log': viewPriceLog,
        'select-store': selectStore,
        'select-position': selectPosition
    },
    watch: {
        storeObj: function(newVal) {
            log('ooooooooooo')
            log(newVal)
            // 清除库位
            this.positionObj = {
                WHPosID: '',
                WHPosName: ''
            }
            this.item.WHName = newVal.WHName
            this.item.WHID = newVal.WHID
            this.updateStore(newVal.WHID)
        },
        positionObj: function(newVal) {
            // log('ooooooooooo')
            // log(newVal)
            this.item.WHPosName = newVal.WHPosName
            this.item.WHPosID = newVal.WHPosID
            this.updatePosition(newVal.WHPosID)
        },
        // 'item.SaleQty': function(newVal) {
        //     // log(this.item)
        //     // this.item.SaleQty = newVal.replace('\.', '8')
        //     // let last = newVal.substr(newVal.length - 1)
        //     // log(last)
        //     // if(last == '\.') {
        //     //     log('jj')
        //     //     // this.item.SaleQty = newVal.slice(0,newVal.length - 1)
        //     //     // this.item.SaleQty = '88'
        //     // }
        // },
        // 'item.SalePrice': function(newVal) {
        //     // log('jjj')
        //     // this.item.SalePrice = '00'

        // },
        // 'item.OrgSalePrice': function(newVal) {
        //     // log('kkk')
        // },
        // 统一监听 向父传值
        item: {
            handler(curVal, oldVal) {
                // log(curVal)
                this.$emit('update:item', this.item)
            },
            deep: true
        }
    }
}
</script>

<style lang="less" scoped>

</style>