<template>
    <div class="orderSearch">
        <mt-header title="订单查询">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>

        <section>
            <div class="bg-white">
                <div @click="dateBeginShow = true">
                    <mt-cell title="开单日期（始）" is-link value="请选择">
                        <span class="value" v-if="dateBegin != ''">{{dateBegin}}</span>
                    </mt-cell>
                </div>
                <div @click="dateEndShow = true">
                    <mt-cell title="开单日期（终）" is-link value="请选择">
                        <span class="value" v-if="dateEnd != ''">{{dateEnd}}</span>
                    </mt-cell>
                </div>

                <mt-field class="inputRight" label="订单号" placeholder="请输入订单号" v-model="orderNum"></mt-field>

                <div @click="$refs.pickerCust.open()">
                    <mt-cell title="客户名称" is-link value="请选择">
                        <span class="value" v-if="custObj.BriefName !== ''">{{custObj.BriefName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerUser.open()">
                    <mt-cell title="业务员" is-link value="请选择">
                        <span class="value" v-if="userObj.CNEmpName != ''">{{userObj.CNEmpName}}</span>
                    </mt-cell>
                </div>

            </div>

        </section>

        <footer class="btnFooter btnNum2">
            <mt-button type="primary" @click="submit()">查询</mt-button>
            <mt-button @click="clear()">清空</mt-button>
        </footer>

        <!-- <mt-datetime-picker v-model="dateBeginBak" @confirm="dateBegin = $moment(dateBeginBak).format('YYYY-MM-DD')" ref="pickerBegin" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker> -->
        <!-- <mt-datetime-picker v-model="dateEndBak" @confirm="dateEnd = $moment(dateEndBak).format('YYYY-MM-DD')" ref="pickerEnd" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker> -->
        <calendar v-model="dateBeginShow" :defaultDate="new Date()" @change="dateBeginChange"></calendar>
        <calendar v-model="dateEndShow" :defaultDate="new Date()" @change="dateEndChange"></calendar>
        <select-cust v-model="custObj" ref="pickerCust"></select-cust>
        <select-user v-model="userObj" ref="pickerUser"></select-user>
    </div>
</template>

<script>
import selectCust from './selectCust'
import selectUser from './selectUser'
export default {
    name: 'orderSearch',
    data() {
        return {
            dateBeginShow: false, // show
            dateBegin: '', // 选上显示值
            dateEndShow: false, // show
            dateEnd: '',
            // orderNum: 'NSC17',
            orderNum: '',
            custObj: {
                Fid: '',
                BriefName: ''
            },
            userObj: {
                EmpID: '',
                CNEmpName: ''
            },

        }
    },
    methods: {
        dateBeginChange(val) { 
            log(val)
            this.dateBegin = this.$moment(val).format('YYYY-MM-DD')
        },
        dateEndChange(val) {
            log(val)
            this.dateEnd = this.$moment(val).format('YYYY-MM-DD')
        },
        clear() {
            this.dateBegin = this.dateEnd = this.orderNum = this.custObj.BriefName = this.userObj.CNEmpName = ''
            this.$toast("已清空")
        },
        submit() {
            // if (this.dateBegin == '') {
            //     this.$toast("请选择开单日期（始）")
            //     return
            // }
            // if (this.dateEnd == '') {
            //     this.$toast("请选择开单日期（终）")
            //     return
            // }
            // if (this.orderNum == '') {
            //     this.$toast("请输入订单号")
            //     return
            // }
            // if (this.custObj.BriefName === '') {
            //     this.$toast("请选择客户")
            //     return
            // }
            // if (this.userObj.CNEmpName === '') {
            //     this.$toast("请选择业务员")
            //     return
            // }
            let data = {
                beginCreateDate: this.dateBegin,
                endCreateDate: this.dateEnd,
                scNo: this.orderNum,
                custFid: this.custObj.Fid,
                saleID: this.userObj.EmpID
            }
            let url = '/home/orderSearchList/' + JSON.stringify(data);
            this.$router.push(url)
        }
    },
    components: {
        'select-cust': selectCust,
        'select-user': selectUser
    }
}
</script>

<style lang="less" scoped>
.orderSearch {
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
        -webkit-overflow-scrolling: touch;
        >h2 {
            padding: 11px 0;
            .iconfont {
                font-size: 14px;
            }
        }
    }
}
</style>