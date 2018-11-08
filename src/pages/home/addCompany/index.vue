<template>
    <div class="addCompany">
        <mt-header title="创建往来单位">
            <router-link to="/home/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>

        <section>
            <div class="bg-white">
                <mt-field class="required inputRight" @blur.native.capture="checkCustName" label="单位名称" placeholder="请输入单位名称" v-model="form.customerName"></mt-field>
                <mt-field class="inputRight" label="检索号" placeholder="检索号" v-model="form.custNum"></mt-field>
                <div @click="$refs.pickerCustType.open()">
                    <mt-cell class="required" title="单位属性" is-link value="请选择单位属性">
                        <span class="value" v-if="form.custTypeObj.ValueName !== ''">{{form.custTypeObj.ValueName}}</span>
                    </mt-cell>
                </div>

                <div @click="$refs.pickerCustClassify.open(form.custTypeObj.ValueID)">
                    <mt-cell class="" title="单位分类" is-link value="请选择单位分类">
                        <span class="value" v-if="form.custClassifyObj.SortName !== ''">{{form.custClassifyObj.SortName}}</span>
                    </mt-cell>
                </div>
                <mt-field class="inputRight" label="单位别名" placeholder="单位别名" v-model="companyName"></mt-field>
                <div @click="$refs.pickerPayment.open()">
                    <mt-cell class="" title="所在城市" is-link value="请选择所在城市">
                        <span class="value" v-if="companyName !== ''">{{companyName}}</span>
                    </mt-cell>
                </div>
                <mt-field class="inputRight" label="单位电话" placeholder="单位电话" v-model="companyName"></mt-field>
                <mt-field class="inputRight" label="微信" placeholder="微信" v-model="companyName"></mt-field>
                <mt-field class="inputRight" label="单位Email" placeholder="单位Email" v-model="companyName"></mt-field>
                <mt-field class="inputRight" label="单位详细地址" placeholder="单位详细地址" v-model="companyName"></mt-field>
                <mt-field class="inputRight" label="备注" placeholder="备注" v-model="companyName"></mt-field>

            </div>
            <h2 class="text-center">
                <mt-button @click="goAddPart()" size="small" type="primary" plain>添加联系人
                    <i class="iconfont icon-add-empty"></i>
                </mt-button>
            </h2>

        </section>

        <footer class="btnFooter">
            <mt-button type="primary" @click="submit()">保存</mt-button>
        </footer>

        <select-cust-type v-model="form.custTypeObj" ref="pickerCustType" @ee="resetClassigyObj"></select-cust-type>
        <select-cust-classify v-model="form.custClassifyObj" ref="pickerCustClassify"></select-cust-classify>
        
    </div>
</template>

<script>
import selectCustType from './selectCustType'
import selectCustClassify from './selectCustClassify'
export default {
    name: 'addCompany',
    data() {
        return {
            form: {
                customerName: '',
                custNum: '',
                custTypeObj: {
                    ValueID: '',
                    ValueName: ''
                },
                custClassifyObj: {
                    FID: '',
                    SortName: ''
                },
            },
           companyName: '',
            account: JSON.parse(this.$getCookie('account'))
        }
    },
    created() {
        // this.isRepeatCustomer()
        // log('jjjllk')
        // this.getCustNum()
    },
    methods: {
        resetClassigyObj() {
            this.form.custClassifyObj = {
                    FID: '',
                    SortName: ''
                }
        },
        checkCustName() {
            // log('jjjkkk')
            this.getCustNum() // 查该客户检索号
        },
        async isRepeatCustomer() {
            let res = await this.$http.get('/api/SaveSelectCustomer', { params: { fid: this.account.fid, briefName: this.form.customerName } })
            console.log(res.data)
            log('888')
        },
        getCustNum() {
            if (this.form.customerName == '') { return }
            this.$http.get('/api/GetCustIndex', { params: { fid: this.account.fid, briefName: this.form.customerName } }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let DataList = res.data.DataList;
                    // console.log(DataList)
                    if (DataList.length > 0 && DataList[0]) {
                        this.form.custNum = DataList[0]
                        this.$toast('已查到检索号')
                    } else {
                        this.$toast('未查到该单位检索号，请手动输入')
                    }
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
    },
    components: {
        'select-cust-type': selectCustType,
        'select-cust-classify': selectCustClassify
    },
    watch: {
        '$route'(to, from) {
            // log('from.name')
            // log(from.name)
        }
    }
}
</script>

<style lang="less" scoped>
.addCompany {
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