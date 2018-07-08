<template>
    <div class="orderSearchList">
        <mt-header title="订单列表">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <section>
            <dl v-for="(item,index) in listData" :key="index" @click="goDetail(item)">
                <dt>{{item.ScNo}}</dt>
                <dd>
                    <span>{{item.CreateDate | formatDate}}</span>
                    <span style="color:#303133">{{item.BriefName}}</span>
                </dd>
                <dd>
                    <span>{{item.TotSCAmt}}</span>
                    <span>{{item.PaymentModeCaption}}</span>
                    <span>{{item.CSITypCaption}}</span>
                    <span>{{item.whOutState}}</span>
                    <span>{{item.faCRState}}</span>
                </dd>
                <i class="iconfont icon-arrow-right"></i>
                <!-- {{item}} -->
            </dl>
        </section>
    </div>
</template>

<script>
import { getCookie } from "@/libs/utils.js";
import moment from 'moment'

export default {
    name: 'orderSearchList',
    props: {
    },
    data() {
        return {
            obj: {},
            account: JSON.parse(getCookie('account')),
            pageIndex: 1,
            pageSize: 15,
            listData: []
        }
    },
    filters: {
        formatDate: function(value) {
            return moment(value).format('YYYY-MM-DD')
        }
    },
    created() {
        this.getData()
    },
    methods: {
        goDetail(item) {
            console.log(item)
            let url = '/home/orderSearchDetail/' + JSON.stringify({ scNo: item.ScNo });
            this.$router.push(url)
        },
        getData() {
            let obj = {}
            try {
                obj = JSON.parse(this.$route.params.string);
                this.obj = obj;
                console.log(obj)
            } catch (e) {
                // console.log("nnn")
                this.$messageBox.alert('参数有误，返回重新查询').then(action => {
                    this.$router.push('/login');
                });
                return;
            }
            let data = {
                fid: this.account.fid,
                beginCreateDate: obj.beginCreateDate,
                endCreateDate: obj.endCreateDate,
                scNo: obj.scNo,
                custFid: obj.custFid,
                saleID: obj.saleID,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            // console.log(data)
            this.$http.get('/api/SearchOrders', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let list = res.data.DataList;
                    // console.log(list)
                    if (list.length === 0) {
                        // console.log("000000000")
                        this.$messageBox.alert('没有查到数据，返回重新查询').then(action => {
                            this.$router.go(-1);
                        });
                    } else {
                        this.listData = list
                    }
                } else {
                    this.$toast(res.data.message);
                }
            }, res => { });
        }
    }
}
</script>

<style lang="less" scoped>
.orderSearchList {
    // border: 1px solid blue;
    height: 100%;
    position: relative;
    section {
        position: absolute;
        left: 0;
        top: 40px;
        right: 0;
        bottom: 0;
        overflow: auto;
        >dl {
            // background: red;
            margin: 0;
            border-bottom: 1px solid #eee;
            padding: 8px 35px 8px 15px;
            color: #606266;
            position: relative;
            >dt {
                color: #008cee;
            }
            >dd {
                // background: red;
                margin: 0;
                >span {
                    margin-right: 8px;
                }
            }
            .iconfont {
                position: absolute;
                width: 30px;
                height: 30px;
                line-height: 30px;
                top: 50%;
                margin-top: -15px;
                right: 0;
                color: #909399;
            }
            &:active {
                background: #f7f8f9;
            }
        }
    }
}
</style>
