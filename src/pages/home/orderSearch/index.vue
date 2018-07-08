<template>
    <div class="orderSearch">
        <mt-header title="订单查询">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>

        <section style="margin-top:15px;">
            <div @click="$refs.pickerBegin.open()">
                <mt-cell title="开单日期（始）" is-link value="请选择">
                    <span v-if="dateBegin != ''">{{dateBegin | formatDate}}</span>
                </mt-cell>
            </div>
            <div @click="$refs.pickerEnd.open()">
                <mt-cell title="开单日期（终）" is-link value="请选择">
                    <span v-if="dateEnd != ''">{{dateEnd | formatDate}}</span>
                </mt-cell>
            </div>

            <mt-field class="inputRight" label="订单号" placeholder="请输入订单号" v-model="orderNum"></mt-field>

            <div @click="$refs.pickerCust.open()">
                <mt-cell title="客户名称" is-link value="请选择">
                    <span v-if="constObj.BriefName !== ''">{{constObj.BriefName}}</span>
                </mt-cell>
            </div>
            <div @click="$refs.pickerUser.open()">
                <mt-cell title="业务员" is-link value="请选择">
                    <span v-if="userObj.CNEmpName != ''">{{userObj.CNEmpName}}</span>
                </mt-cell>
            </div>

        </section>

        <footer class="btnFooter btnNum2">
            <mt-button type="primary" @click="submit()">查询</mt-button>
            <mt-button @click="clear()">清空</mt-button>
        </footer>

        <mt-datetime-picker v-model="dateBegin" @confirm="handleConfirm" ref="pickerBegin" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
        <mt-datetime-picker v-model="dateEnd" ref="pickerEnd" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>

        <select-cust v-model="constObj" ref="pickerCust"></select-cust>
        <select-user v-model="userObj" ref="pickerUser"></select-user>
    </div>
</template>

<script>
import selectCust from './selectCust'
import selectUser from './selectUser'
import moment from 'moment'
export default {
    name: 'orderSearch',
    data() {
        return {
            dateBegin: '',
            dateEnd: '',
            orderNum: 'NSC17',
            constObj: {
                Fid: 0,
                BriefName: ''
            },
            userObj: {
                EmpID: '',
                CNEmpName: ''
            },

        }
    },
    filters: {
      formatDate: function (value) {
        return moment(value).format('YYYY-MM-DD')
      }
    },
    methods: {
        handleConfirm(val) {
            // console.log(val)
            // console.log(typeof val)
        },
        clear() {
            // this.dateBegin = this.dateEnd = this.orderNum = this.constObj.BriefName = this.userObj.CNEmpName = ''
            this.orderNum = this.constObj.BriefName = this.userObj.CNEmpName = ''
            this.$toast("已清空")
        },
        submit() {
            if (this.dateBegin == '') {
                this.$toast("请选择开单日期（始）")
                return
            }
            if (this.dateEnd == '') {
                this.$toast("请选择开单日期（终）")
                return
            }
            if (this.orderNum == '') {
                this.$toast("请输入订单号")
                return
            }
            if (this.constObj.BriefName === '') {
                this.$toast("请选择客户")
                return
            }
            if (this.userObj.CNEmpName === '') {
                this.$toast("请选择业务员")
                return
            }
            let data = {
                beginCreateDate: moment(this.dateBegin).format('YYYY-MM-DD'),
                endCreateDate: moment(this.dateEnd).format('YYYY-MM-DD'),
                scNo: this.orderNum,
                custFid: this.constObj.Fid,
                saleID: this.userObj.EmpID
            }
            let url = '/home/orderSearchList/' + JSON.stringify(data);
            this.$router.push(url)

            // console.log(moment(this.dateBegin).format('YYYY-MM-DD'))
            // let data = {
            //     fid: this.account.fid,
            //     beginCreateDate: moment(this.dateBegin).format('YYYY-MM-DD'),
            //     pageIndex: this.pageIndex,
            //     pageSize: this.pageSize
            // }
            // console.log(data)
            // return
            // this.$http.get('/api/SelectCustomer', { params: data }).then(res => {
            //     if (res.data.status.toString() === this.GLOBAL.status) {
            //         let data = res.data.DataList;
            //         // console.log(list)
            //         if (data.length === 0) {
            //             this.loading = false;
            //             this.isMore = true;
            //             // this.pageIndex = 1
            //             return;
            //         }
            //         this.popupArr = this.popupArr.concat(data);
            //     } else {
            //         this.$toast(res.data.message);
            //     }
            // }, res => { });

        }
    },
    components: {
        'select-cust': selectCust,
        'select-user': selectUser,
    }
}
</script>
