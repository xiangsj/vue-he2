<template>
    <div class="salesOrder">
        <mt-header title="销售下单">
            <router-link to="/home/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>

        <section>
            <div class="bg-white">

                <div @click="$refs.pickerCust.open()">
                    <mt-cell class="required" title="客户" is-link value="请选择">
                        <span class="value" v-if="custObj.BriefName !== ''">{{custObj.BriefName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerStore.open(custObj.Fid)" class="hasInput">
                    <mt-cell title="销往门店" is-link value="请选择">
                        <!-- <input type="text" placeholder="请选择或输入" :value="storeObj.Departement" v-on:click.stop.prevent> -->
                        <span class="value" v-if="storeObj.Departement !== ''">{{storeObj.Departement}}</span>
                    </mt-cell>
                </div>
                <mt-field class="inputRight required" label="客户联系人" placeholder="请输入客户联系人" v-model="storeObj.FullName"></mt-field>
                <mt-field class="inputRight" label="客户电话" placeholder="请输入客户电话" v-model="storeObj.Tel"></mt-field>
                <mt-field class="inputRight" label="送货地址" placeholder="请输入送货地址" v-model="storeObj.Addr"></mt-field>
                <div @click="$refs.pickerBilling.open()">
                    <mt-cell class="required" title="开票类型" is-link value="请选择">
                        <span class="value" v-if="billingObj.ValueName !== ''">{{billingObj.ValueName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerSend.open()" class="hasInput">
                    <mt-cell class="required" title="发运方式" is-link value="请选择">
                        <!-- <input type="text" placeholder="请选择或输入" :value="sendObj.ValueName" v-on:click.stop.prevent> -->
                        <span class="value" v-if="sendObj.ValueName !== ''">{{sendObj.ValueName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerPayment.open()">
                    <mt-cell class="required" title="付款方式" is-link value="请选择">
                        <span class="value" v-if="paymentObj.ValueName !== ''">{{paymentObj.ValueName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerUser.open()">
                    <mt-cell class="required" title="业务员" is-link value="请选择">
                        <span class="value" v-if="userObj.CNEmpName != ''">{{userObj.CNEmpName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerBegin.open()">
                    <mt-cell class="required" title="开单日期" is-link value="请选择">
                        <span class="value" v-if="dateBegin != ''">{{dateBegin}}</span>
                    </mt-cell>
                </div>
                <mt-field class="inputRight" label="备注" placeholder="请输入备注" v-model="mark"></mt-field>
                <mt-field class="inputRight" label="订单总金额" placeholder="请输入订单总金额" v-model="total"></mt-field>
            </div>
            <h2 class="text-center">
                <mt-button @click="goAddPart()" size="small" type="primary" plain>添加配件
                    <i class="iconfont icon-add-empty"></i>
                </mt-button>
            </h2>

            <div class="bg-white partsList">
                <dl v-for="(item,index) in partsAdd" :key="index">
                    <div class="btns">
                        <span @click="removeThis(index)">
                            <i class="iconfont icon-remove"></i>
                        </span>
                        <span @click="editThis(index)">
                            <i class="iconfont icon-edit"></i>
                        </span>
                    </div>
                    <dt>
                        <img v-if="item.mSmallPic" :src="item.mSmallPic">
                        <i v-else class="iconfont icon-pic"></i>
                    </dt>
                    <dd>
                        <div>
                            {{item.ProvItemNo}}
                            <span v-if="item.EngineNo && item.EngineNo != ''">/{{item.EngineNo}}</span>
                            <span style="margin-left:20px;" v-if="item.C_Unit && item.C_Unit != ''">{{item.SaleQty}} {{item.C_Unit}} {{item.SalePrice}}</span>
                        </div>
                        <div>
                            {{item.Item_C_Name}}、 {{item.Item_C_Spec}}、{{item.Brand}}、{{item.UseInCarBrief}}、{{item.WHName}}
                        </div>
                    </dd>
                </dl>
            </div>

        </section>

        <footer class="btnFooter">
            <mt-button type="primary" @click="submit()">保存</mt-button>
        </footer>

        <select-cust v-model="custObj" ref="pickerCust"></select-cust>
        <select-store v-model="storeObj" ref="pickerStore"></select-store>
        <select-billing v-model="billingObj" ref="pickerBilling"></select-billing>
        <select-send v-model="sendObj" ref="pickerSend"></select-send>
        <select-payment v-model="paymentObj" ref="pickerPayment"></select-payment>
        <select-user v-model="userObj" ref="pickerUser"></select-user>
        <mt-datetime-picker v-model="dateBeginBak" @confirm="dateBegin = $moment(dateBeginBak).format('YYYY-MM-DD')" ref="pickerBegin" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>

    </div>
</template>

<script>
import { setCookie } from "@/libs/utils.js";

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
            custObj: {
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
            partsAdd: [
                // { SalePrice: 'TEST111' },
                // { SalePrice: 'TEST222' }
            ],
            account: JSON.parse(this.$getCookie('account')),
            user: JSON.parse(this.$getCookie('user'))
        }
    },
    created() {
        // console.log('salesorder start 可在这清空data')
        // log(this.$moment(new Date()).format('YYYY-MM-DD'))
        // log(new Date())
    },
    methods: {
        submit() {
            if (this.custObj.Fid == '') {
                this.$toast('请选择客户')
                return
            }
            // if (this.storeObj.FullName == '') {
            //     this.$toast('客户联系人不能为空')
            //     return
            // }
            // if (this.billingObj.ValueID == '') {
            //     this.$toast('开票类型不能为空')
            //     return
            // }
            // if (this.sendObj.ValueID == '') {
            //     this.$toast('发运方式不能为空')
            //     return
            // }
            // if (this.paymentObj.ValueID == '') {
            //     this.$toast('付款方式不能为空')
            //     return
            // }
            // if (this.dateBegin == '') {
            //     this.$toast('开单日期不能为空')
            //     return
            // }
            // if (this.partsAdd.length === 0) {
            //     this.$toast('请添加配件')
            //     return
            // }

            let Head = {
                ScNo: '???',
                CustFID: this.custObj.Fid + '',
                // CreateDate: this.$moment(new Date()).format('YYYY-MM-DD'),
                CreateDate: this.dateBegin,
                BriefName: '???',
                BName: this.custObj.Departement,
                BContact: this.storeObj.FullName,
                BTel: this.storeObj.Tel + '',
                DeliveryAddr: this.storeObj.Addr,

                TotSCAmt: this.total + '',
                PaymentModeCaption: this.paymentObj.ValueID + '',
                CSITypCaption: this.billingObj.ValueID,
                DeliveryMode: this.sendObj.ValueName,
                whOutState: "???",
                faCRState: "???",
                SaleID: this.sendObj.ValueID + '',
                SaleName: this.userObj.CNEmpName,
                Memo: this.mark
            }
            let jsondata = {
                fid: this.account.fid,
                dataList: {Head:Head,Detail:this.partsAdd},
                empId: this.user.username
            }
            log(jsondata)
            
            this.$http.post('/api/SaveSalesOrder', jsondata).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    log(res.data)
                    // let list = res.data.DataList;
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
        goAddPart() {
            if (this.custObj.Fid == '') {
                this.$toast('请选择客户')
                return
            } else {
                // console.log(this.custObj)
                setCookie("custObj", this.custObj);
            }
            this.$router.push('/home/partSearch')
        },
        // 显示所选配件
        showParts() {
            let parts = this.$getCookie('partsObj') || '[]'
            let Arr = JSON.parse(parts)
            this.partsAdd = Arr
            log(Arr)
        },
        removeThis(index) {
            this.$messageBox.confirm('确定移除这个配件吗?', '').then(action => {
                this.partsAdd.splice(index, 1)
            }).catch(() => { });
        },
        editThis(index) {
            this.$router.push('/home/partAdd/' + '187')
        },
        clearData() {
            this.custObj = {
                Fid: '',
                BriefName: ''
            }
            this.storeObj = {
                FID: '',
                Addr: '',
                Departement: '',
                FullName: '',
                Tel: ''
            }
            this.billingObj = {
                ValueID: '',
                ValueName: ''
            }
        }
    },
    components: {
        'select-cust': selectCust,
        'select-store': selectStore,
        'select-billing': selectBilling,
        'select-send': selectSend,
        'select-payment': selectPayment,
        'select-user': selectUser,
    },
    watch: {
        '$route'(to, from) {
            log('ccccc')
            if (from.name === 'partAdd') {
                this.showParts()
            } else {
                this.clearData()
            }
        }
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
        .partsList {
            >dl {
                background: #fff;
                padding: 8px 50px 8px 15px;
                position: relative;
                min-height: 58px;
                border-bottom: 1px solid #eee;
                .btns {
                    // border:1px solid red;
                    position: absolute;
                    top: 3px;
                    right: 10px;
                    bottom: 3px;
                    >span {
                        // border:1px solid blue;
                        display: block;
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        margin: 3px 0;
                        border-radius: 50%;
                        i {
                            font-size: 23px;
                        }
                        .icon-remove {
                            color: red;
                        }
                        .icon-edit {
                            color: #008cee;
                        }
                        &:active {
                            background: #ddd;
                        }
                    }
                }
                >dt {
                    // background: #eee;
                    width: 55px;
                    height: 55px;
                    line-height: 55px;
                    text-align: center;
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    margin-top: -27px;
                    i {
                        font-size: 46px;
                        color: #909399;
                    }
                }
                >dd {
                    margin-left: 66px;
                    padding-top: 6px;
                    line-height: 22px;
                    >div {
                        clear: both;
                    }
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>