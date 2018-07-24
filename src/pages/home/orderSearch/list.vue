<template>
    <div class="orderSearchList">
        <mt-header title="订单列表">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <section v-infinite-scroll="loadMore" infinite-scroll-disabled="isMore" infinite-scroll-distance="10">
            <dl v-for="(item,index) in listData" :key="index" @click="goDetail(item)">
                <dt>{{item.ScNo}}</dt>
                <dd>
                    <span>{{$moment(item.CreateDate).format('YYYY-MM-DD')}}</span>
                    <span style="color:#303133">{{item.BriefName}}</span>
                </dd>
                <dd>
                    <span>{{item.TotSCAmt}}元</span>
                    <span>{{item.PaymentModeCaption}}</span>
                    <span>{{item.CSITypCaption}}</span>
                    <span>{{item.whOutState}}</span>
                    <span>{{item.faCRState}}</span>
                </dd>
                <i class="iconfont icon-arrow-right"></i>
                <!-- {{item}} -->
            </dl>
            <div class="getMore text-center">
                <span v-if="loading">努力加载中...</span>
                <span v-else>没有更多了</span>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'orderSearchList',
    data() {
        return {
            isMore: true,//false 为开启加载更多
            loading: false,
            obj: {},
            account: JSON.parse(this.$getCookie('account')),
            pageIndex: 1,
            pageSize: 10,
            listData: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        loadMore() {
            // console.log('iii')
            this.loading = true
            this.pageIndex++
            let data = {
                fid: this.account.fid,
                beginCreateDate: this.obj.beginCreateDate,
                endCreateDate: this.obj.endCreateDate,
                scNo: this.obj.scNo,
                custFid: this.obj.custFid,
                saleID: this.obj.saleID,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            // console.log(data)
            this.$http.get('/api/SearchOrders', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    this.loading = false;
                    let data = res.data.DataList;
                    // console.log(data)
                    if (data.length === 0) {
                        this.isMore = true;
                        // this.pageIndex = 1
                        return;
                    }
                    this.listData = this.listData.concat(data);
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
        goDetail(item) {
            // console.log(item)
            let url = '/home/orderSearchDetail/' + JSON.stringify({ scNo: item.ScNo });
            this.$router.push(url)
        },
        getData() {
            this.loading = true
            let obj = {}
            try {
                obj = JSON.parse(this.$route.params.string);
                this.obj = obj;
                // console.log(obj)
            } catch (e) {
                // console.log("nnn")
                this.$messageBox.alert('参数有误，返回重新查询').then(action => {
                    this.$router.push('/login');
                });
                return;
            }
            let data = {
                fid: this.account.fid,
                beginCreateDate: this.obj.beginCreateDate,
                endCreateDate: this.obj.endCreateDate,
                scNo: this.obj.scNo,
                custFid: this.obj.custFid,
                saleID: this.obj.saleID,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            console.log(data)
            this.$http.get('/api/SearchOrders', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    this.loading = false
                    let list = res.data.DataList;
                    // console.log(list)
                    if (list.length === 0) {
                        // console.log("000000000")
                        this.$messageBox.alert('没有查到数据，返回重新查询').then(action => {
                            this.$router.go(-1);
                        });
                        return
                    } else if (list.length >= this.pageSize) {
                        // 多于当前条数，接着再查
                        this.isMore = false
                        // console.log('mmm')
                    }
                    this.listData = list
                } else {
                    this.$messageBox(res.data.message)
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
