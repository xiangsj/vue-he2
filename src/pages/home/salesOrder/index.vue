<template>
    <div class="salesOrder">
        <mt-header title="销售下单">
            <router-link to="/home/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>

        <section>
            <div class="bg-white">

                <div @click="$refs.pickerCompany.open()">
                    <mt-cell class="required" title="公司抬头" is-link value="请选择">
                        <span class="value" v-if="companyObj.CompanyName !== ''">{{companyObj.CompanyName}}</span>
                    </mt-cell>
                </div>

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
                        <span class="value" v-if="dateBegin != ''">{{$moment(dateBegin).format('YYYY-MM-DD')}}</span>
                    </mt-cell>
                </div>
                <mt-field class="inputRight" label="备注" placeholder="请输入备注" v-model="mark"></mt-field>
                <mt-cell class="itemTxt" title="订单总金额" :value="total.toFixed(2)"></mt-cell>

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
                            <span v-if="item.EngineNo && item.EngineNo != ''">/ {{item.EngineNo}}</span>
                            <span style="margin-left:20px;" v-if="item.C_Unit && item.C_Unit != ''">{{Number(item.SaleQty).toFixed(0)}} {{item.C_Unit}} {{Number(item.SalePrice).toFixed(2)}}</span>
                        </div>
                        <div>
                            <span v-if="item.Item_C_Name">{{item.Item_C_Name}}、</span>
                            <span v-if="item.Item_C_Spec">{{item.Item_C_Spec}}、</span>
                            <span v-if="item.Brand">{{item.Brand}}、</span>
                            <span v-if="item.UseInCarBrief">{{item.UseInCarBrief}}、</span>
                            {{item.WHName}}
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
        <select-company v-model="companyObj" ref="pickerCompany"></select-company>
        <mt-datetime-picker v-model="dateBeginBak" @confirm="dateBegin = $moment(dateBeginBak).format('YYYY-MM-DD')" ref="pickerBegin" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
        <part-edit v-model="partsAdd" @change="editChange" ref="toEditPart"></part-edit>
    </div>
</template>

<script>
import { setCookie, removeCookie } from "@/libs/utils.js";

import selectCust from '../orderSearch/selectCust'
import selectStore from './selectStore'
import selectBilling from './selectBilling'
import selectSend from './selectSend'
import selectPayment from './selectPayment'
import selectCompany from './selectCompany'

import selectUser from '../orderSearch/selectUser'

import partEdit from './partEdit'
export default {
    name: 'salesOrder',
    data() {
        return {
            companyObj: {
                CompanyID: '',
                CompanyName: ''
            },
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
            dateBegin: new Date(),
            dateBeginBak: new Date(), // 初始值
            mark: '',
            total: 0,
            partsAdd: [
                // { SalePrice: 'TEST111' },
                // { SalePrice: 'TEST222' }
            ],
            account: JSON.parse(this.$getCookie('account')),
            user: JSON.parse(this.$getCookie('user')),
            flag: null
        }
    },
    created() {
        // log('jjjllk')
        this.getCompanyData()
    },
    methods: {
        getCompanyData() {
            this.$http.get('/api/GetDefaultCompany', { params: {fid: this.account.fid, empId:this.user.username} }).then(res => {
            // this.$http.get('/api/GetDefaultCompany', { params: {fid: this.account.fid, empId:'admin'} }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let list = res.data.DataList;
                    // console.log(list)
                    if(list.length>0){
                        this.companyObj = list[0]
                    } else {
                        this.$toast('未查到业务员公司抬头')
                    }
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
        submit() {
            if (!this.companyObj.CompanyID || this.companyObj.CompanyID == '') {
                this.$toast('请选择公司抬头')
                return
            }
            if (!this.custObj.Fid || this.custObj.Fid == '') {
                this.$toast('请选择客户')
                return
            }
            if (!this.storeObj.FullName || this.storeObj.FullName == '') {
                this.$toast('客户联系人不能为空')
                return
            }
            if (!this.billingObj.ValueID || this.billingObj.ValueID == '') {
                this.$toast('开票类型不能为空')
                return
            }
            if (!this.sendObj.ValueID || this.sendObj.ValueID == '' || this.sendObj.ValueName == '') {
                this.$toast('发运方式不能为空')
                return
            }
            if (!this.paymentObj.ValueID || this.paymentObj.ValueID == '' || this.paymentObj.ValueName == '') {
                this.$toast('付款方式不能为空')
                return
            }
            if (this.dateBegin == '') {
                this.$toast('开单日期不能为空')
                return
            }
            if (this.partsAdd.length === 0) {
                this.$toast('请添加配件')
                return
            }

            let Head = {
                ExpCompany: this.companyObj.CompanyName,
                CustFID: this.custObj.Fid + '',
                CreateDate: this.dateBegin,

                BName: this.storeObj.Departement || '',
                BContact: this.storeObj.FullName || '',
                BTel: this.storeObj.Tel + '',
                DeliveryAddr: this.storeObj.Addr || '',

                TotSCAmt: this.total,
                PaymentModeCaption: this.paymentObj.ValueID,
                CSITypCaption: this.billingObj.ValueID,
                DeliveryMode: this.sendObj.ValueName,

                SaleID: this.userObj.EmpID + '',
                SaleName: this.userObj.CNEmpName,
                Memo: this.mark
            }

            let jsondata = {
                fid: this.account.fid,
                dataList: { Head: Head, Detail: this.partsAdd },
                empId: this.user.username
            }
            log(jsondata)
            log(jsondata)
            log(jsondata)
            log(this.storeObj)
            this.$http.post('/api/SaveSalesOrder', jsondata).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    // log(res.data)
                    let list = res.data.DataList;
                    if (list && list.FID && list.OrderNumber) {
                        let msg = '订单号为：' + list.OrderNumber + '<br>是否现在通知仓库备货？'
                        this.$messageBox.confirm(msg, '销售下单成功').then(action => {
                            this.tellToBuy(list.FID)
                        }).catch(() => { 
                            this.$toast('下单已取消')
                            this.$router.push('/home/main');
                        });
                    }else{
                        this.$toast('返回有误，请检查接口返回')
                    }
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
        // 通知备货
        tellToBuy(orderFid) {
            let data = {
                fid: this.account.fid,
                orderFid: orderFid,
                empId: this.user.username
            }
            this.$http.get('/api/NoticeWarehouse', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    this.$toast('通知备货成功')
                    this.$router.push('/home/main');
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
        goAddPart() {
            if (this.custObj.Fid == '') {
                this.$toast('请选择客户')
                return
            }
            setCookie("custObj", this.custObj);
            this.$router.push('/home/partSearch')
        },
        // 显示所选配件
        showParts() {
            let parts = this.$getCookie('partsObj') || '[]'
            let Arr = JSON.parse(parts)
            let num = 0 // 计算总价：价格*数据 然后加起来
            Arr.forEach(item => {
                num += item.SalePrice * item.SaleQty
            })
            this.total = num
            this.partsAdd = Arr
            this.$toast('配件添加成功')
        },
        removeThis(index) {
            this.$messageBox.confirm('确定移除这个配件吗?', '').then(action => {
                let val = this.partsAdd[index].SalePrice * this.partsAdd[index].SaleQty
                this.total -= val // 价格减去
                this.partsAdd.splice(index, 1)
            }).catch(() => { });
            this.$toast('移除成功')
        },
        editThis(index) {
            // this.$router.push('/home/partAdd/' + '187')
            this.$refs.toEditPart.open(index)
        },
        editChange(val) {
            // log(val)
            // 重新算总价
            let num = 0 // 计算总价：价格*数据 然后加起来
            val.forEach(item => {
                num += item.SalePrice * item.SaleQty
            })
            this.total = num
            this.$toast('修改成功')
        },
        clearData() {
            // 配件要清零
            removeCookie('partsObj');
            this.getCompanyData()
            this.companyObj = {
                CompanyID: '',
                CompanyName: ''
            }
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
            this.sendObj = {
                ValueID: '',
                ValueName: ''
            }

            this.paymentObj = {
                ValueID: '',
                ValueName: ''
            }
            this.userObj = {
                EmpID: JSON.parse(this.$getCookie('account')).EmpID,
                CNEmpName: JSON.parse(this.$getCookie('account')).CNEmpName
            }
            this.dateBegin = new Date()
            this.mark = ''
            this.total = 0
            this.partsAdd = []
        },
        custGetData(id) {
            let data = {
                fid: this.account.fid,
                custID: id
            }
            this.$http.get('/api/CustomerSelect', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let backArr = res.data.DataList
                    if (backArr.length === 0) { return }
                    let backObj = backArr[0]
                    log(backObj)
                    
                    this.storeObj.Departement = backObj.BName
                    this.storeObj.FullName = backObj.BContact
                    this.storeObj.Tel = backObj.BTel
                    this.storeObj.Addr = backObj.DeliveryAddr

                    this.billingObj.ValueID = backObj.CSITyp
                    this.billingObj.ValueName = backObj.CSITypCaption

                    this.sendObj.ValueID = backObj.DeliveryMode
                    this.sendObj.ValueName = backObj.DeliveryMode

                    this.paymentObj.ValueID = backObj.PaymentMode
                    this.paymentObj.ValueName = backObj.PaymentModeCaption
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        }
    },
    components: {
        'select-cust': selectCust,
        'select-store': selectStore,
        'select-billing': selectBilling,
        'select-send': selectSend,
        'select-payment': selectPayment,
        'select-user': selectUser,
        'select-company': selectCompany,
        'part-edit': partEdit
    },
    watch: {
        '$route'(to, from) {
            // log(from.name)
            if (from.name === 'partAdd') {
                this.showParts()
            }
            if (from.name === 'main') {
                this.clearData()
            }
        },
        custObj: function(newVal){
            // log(newVal)
            this.custGetData(newVal.Fid)
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
        bottom: 60px;
        padding-bottom: 30px;
        -webkit-overflow-scrolling: touch;
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