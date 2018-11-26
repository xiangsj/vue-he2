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

                <!-- <mt-field class="inputRight required" label="开单价格" placeholder="请输入" v-model="currentArr.OrgSalePrice"></mt-field>
                        <mt-field class="inputRight required" label="实际销售单价" placeholder="请输入" v-model="currentArr.SalePrice"></mt-field>
                        <mt-field class="inputRight required" label="销售数量" placeholder="请输入" v-model="currentArr.SaleQty"></mt-field> -->
                <div class="hasInput required">
                    <mt-cell title="开单价格" value="请选择">
                        <input type="number" @keydown="handleInput2" placeholder="请输入" v-model="currentArr.OrgSalePrice" v-on:click.stop.prevent>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerPriceLog.open('bzh001')" class="hasInput required">
                    <mt-cell title="实际销售单价" is-link value="请选择">
                        <input type="number" @keydown="handleInput2" placeholder="请输入或查看" v-model="currentArr.SalePrice" v-on:click.stop.prevent>
                    </mt-cell>
                </div>
                <div class="hasInput required">
                    <mt-cell title="销售数量" value="请选择">
                        <input type="number" @keydown="handleInput" placeholder="请输入" v-number-only v-model="currentArr.SaleQty" v-on:click.stop.prevent>
                    </mt-cell>
                </div>

                <mt-cell class="itemTxt" title="配件名称" :value="currentArr.Item_C_Name"></mt-cell>
                <mt-cell class="itemTxt" title="配件规格" :value="currentArr.Item_C_Spec"></mt-cell>
                <mt-cell class="itemTxt" title="车系代码" :value="currentArr.UseInCarDesc"></mt-cell>
                <mt-cell class="itemTxt" title="适用车型" :value="currentArr.UseInCarBrief"></mt-cell>
                <mt-cell class="itemTxt" title="计量单位" :value="currentArr.C_Unit"></mt-cell>
                <mt-cell class="itemTxt" title="品牌" :value="currentArr.Brand"></mt-cell>
                <mt-cell class="itemTxt" title="单箱数量" :value="currentArr.UnitBoxQty"></mt-cell>
                <!-- <mt-cell class="itemTxt" title="发货仓库" :value="currentArr.WHName"></mt-cell> -->
                <div @click="$refs.pickerStore.open()">
                    <mt-cell class="required" title="发货仓库" is-link value="请选择">
                        <span class="value" v-if="currentArr.WHName !== ''">{{currentArr.WHName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerPosition.open(currentArr.WHID)">
                    <mt-cell class="" title="仓库库位" is-link value="请选择">
                        <span class="value" v-if="currentArr.WHPosName !== ''">{{currentArr.WHPosName}}</span>
                    </mt-cell>
                </div>
                <mt-cell class="itemTxt" title="库存量" :value="currentArr.StockQty"></mt-cell>
                <mt-field class="inputRight" label="备注" placeholder="请输入备注" v-model="currentArr.Memo"></mt-field>
                <!-- {{currentArr}} -->
            </section>
            <div class="buttonFoot">
                <mt-button size="large" type="primary" @click="surePopup()">确定</mt-button>
            </div>
        </mt-popup>
        <!-- 价格展示 -->
        <view-price-log ref="pickerPriceLog"></view-price-log>
        <!-- 选择仓库 -->
        <select-store v-model="storeObj" ref="pickerStore"></select-store>
        <!-- 选择库位 -->
        <select-position v-model="positionObj" ref="pickerPosition"></select-position>
    </div>
</template>

<script>
import viewPriceLog from '@/components/viewPriceLog'
import selectStore from '@/components/selectStore'
import selectPosition from '@/components/selectPosition'

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
            },// 当前选中项
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
    directives: {
        // v-number-only
        numberOnly: {
            bind: function(el) {
                el.handler = function() {
                    el.value = el.value.replace(/\D+/, '')
                }
                el.addEventListener('input', el.handler)
            },
            unbind: function(el) {
                el.removeEventListener('input', el.handler)
            }
        }
    },
    created() {

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
        },
        // 更新库存
        updateStore(val) {
            let data = {
                fid: this.account.fid,
                provItemNo: this.currentArr.ProvItemNo,
                whId: val
            }
            this.$http.get('/api/WarehouseSelectReturn', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let list = res.data.DataList;
                    console.log(list)
                    this.currentArr.StockQty = list.StockQty
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
        // 更新库存 2
        updatePosition(val) {
            let data = {
                fid: this.account.fid,
                provItemNo: this.currentArr.ProvItemNo,
                whId: this.currentArr.WHID,
                whPosId: val
            }
            this.$http.get('/api/WharePosSelectReturn', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let list = res.data.DataList;
                    // console.log(list)
                    // log(typeof list)
                    this.currentArr.StockQty = isNaN(list.length) ? list.StockQty : list[0].StockQty
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
            // log('ooooooooooo')
            // log(newVal)
            this.currentArr.WHName = newVal.WHName
            this.currentArr.WHID = newVal.WHID
            this.updateStore(newVal.WHID)
        },
        positionObj: function(newVal) {
            // log('ooooooooooo')
            // log(newVal)
            this.currentArr.WHPosName = newVal.WHPosName
            this.currentArr.WHPosID = newVal.WHPosID
            this.updatePosition(newVal.WHPosID)
        },
    }
}
</script>
