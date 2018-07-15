<template>
    <div class="salesOrder">
        <mt-header title="销售下单">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>

        <section>
             <div class="bg-white" style="padding:10px 0">

                <div @click="$refs.pickerCust.open()">
                    <mt-cell title="客户" is-link value="请选择">
                        <span v-if="constObj.BriefName !== ''">{{constObj.BriefName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerStore.open(constObj.Fid)" class="hasInput">
                    <mt-cell title="销往门店" is-link value="请选择">
                        <!-- <input type="text" placeholder="请选择或输入" :value="storeObj.Departement" v-on:click.stop.prevent> -->
                        <span v-if="storeObj.Departement !== ''">{{storeObj.Departement}}</span>
                    </mt-cell>
                </div>
                <mt-field class="inputRight" label="客户联系人" placeholder="请输入客户联系人" v-model="storeObj.FullName"></mt-field>
                <mt-field class="inputRight" label="客户电话" placeholder="请输入客户电话" v-model="storeObj.Tel"></mt-field>
                <mt-field class="inputRight" label="送货地址" placeholder="请输入送货地址" v-model="storeObj.Addr"></mt-field>
                <div @click="$refs.pickerBilling.open()">
                    <mt-cell title="开票类型" is-link value="请选择">
                        <span v-if="billingObj.ValueName !== ''">{{billingObj.ValueName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerSend.open()" class="hasInput">
                    <mt-cell title="发运方式" is-link value="请选择">
                        <!-- <input type="text" placeholder="请选择或输入" :value="sendObj.ValueName" v-on:click.stop.prevent> -->
                        <span v-if="sendObj.ValueName !== ''">{{sendObj.ValueName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerPayment.open()">
                    <mt-cell title="付款方式" is-link value="请选择">
                        <span v-if="paymentObj.ValueName !== ''">{{paymentObj.ValueName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerUser.open()">
                    <mt-cell title="业务员" is-link value="请选择">
                        <span v-if="userObj.CNEmpName != ''">{{userObj.CNEmpName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerBegin.open()">
                    <mt-cell title="开单日期" is-link value="请选择">
                        <span v-if="dateBegin != ''">{{dateBegin}}</span>
                    </mt-cell>
                </div>
                <mt-field class="inputRight" label="备注" placeholder="请输入备注" v-model="mark"></mt-field>
                <mt-field class="inputRight" label="订单总金额" placeholder="请输入订单总金额" v-model="total"></mt-field>
            </div>
            <h2 class="text-center">
                <mt-button size="small" type="primary" plain>添加配件
                    <i class="iconfont icon-add-empty"></i>
                </mt-button>
            </h2>
            <!-- <div class="bg-white">
                    sss
                </div> -->
        </section>

        <footer class="btnFooter">
            <mt-button type="primary" @click="submit()">保存</mt-button>
        </footer>

        <select-cust v-model="constObj" ref="pickerCust"></select-cust>
        <select-store v-model="storeObj" ref="pickerStore"></select-store>
        <select-billing v-model="billingObj" ref="pickerBilling"></select-billing>
        <select-send v-model="sendObj" ref="pickerSend"></select-send>
        <select-payment v-model="paymentObj" ref="pickerPayment"></select-payment>
        <select-user v-model="userObj" ref="pickerUser"></select-user>
        <mt-datetime-picker v-model="dateBeginBak" @confirm="dateBegin = $moment(dateBeginBak).format('YYYY-MM-DD')" ref="pickerBegin" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>

    </div>
</template>

<script>
import selectCust from '../orderSearch/selectCust'
import selectStore from './selectStore'
import selectBilling from './selectBilling'
import selectSend from './selectSend'
import selectPayment from './selectPayment'

import selectUser from '../orderSearch/selectUser'
export default {
    name: 'salesOrder',
    data() {
        return {
            constObj: {
                Fid: '',
                BriefName: ''
            },
            storeObj: {
                FID: '',
                Addr: '',
                Departement: '',
                FullName: '',
                Tel: ''
            },
            // constTel: '',
            // constAddr: '',
            billingObj: {
                ValueID: '',
                ValueName: ''
            },
            sendObj: {
                ValueID: '',
                ValueName: ''
            },
            paymentObj: {
                ValueID: '',
                ValueName: ''
            },
            userObj: {
                EmpID: JSON.parse(this.$getCookie('account')).EmpID,
                CNEmpName: JSON.parse(this.$getCookie('account')).CNEmpName
            },
            dateBegin: '',
            dateBeginBak: new Date(), // 初始值
            mark: '',
            total: '',
        }
    },
    created() {
    },
    methods: {
        submit() {

        }
    },
    components: {
        'select-cust': selectCust,
        'select-store': selectStore,
        'select-billing': selectBilling,
        'select-send': selectSend,
        'select-payment': selectPayment,
        'select-user': selectUser,
    }
}
</script>

<style lang="less" scoped>
.salesOrder {
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
        >h2 {
            padding: 11px 0; 
            .iconfont {
                font-size: 14px;
            }
        }
    }
}
</style>