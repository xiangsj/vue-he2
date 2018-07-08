<template>
    <div class="selectCust popupSelect">
        <mt-popup v-model="popupVisible" position="right" class="modelRight">
            <mt-header title="选择客户">
                <router-link to="" slot="left">
                    <mt-button icon="back" @click="popupVisible = false">返回</mt-button>
                </router-link>
            </mt-header>
            <section v-infinite-scroll="loadMore" infinite-scroll-disabled="isMore" infinite-scroll-distance="10">
                <div class="pupupSearch">
                    <input v-model="inputValue" type="search" placeholder="请输入客户名称、地址、电话">
                    <span class="icon" @click="searchCust()">
                        <i class="iconfont icon-search"></i>
                    </span>
                </div>
                <ul class="dataList">
                    <li v-for="(item,index) in popupArr" :key="index" @click="currentObj = item" :class="[currentObj.Fid == item.Fid ? 'active' : '']">
                        {{item.BriefName}}
                        <div>
                            <span style="margin-right:20px;" v-if="item.Addr">{{item.Addr}}</span>{{item.Tel}} </div>
                        <span class="icon" v-if="currentObj.Fid == item.Fid">
                            <i class="iconfont icon-hook"></i>
                        </span>
                    </li>
                </ul>
                <div class="getMore text-center">
                    <span v-if="loading">努力加载中...</span>
                    <span v-else>没有更多了</span>
                </div>
            </section>
            <div class="buttonFoot">
                <mt-button size="large" type="primary" @click="surePopup()">确定</mt-button>
            </div>
        </mt-popup>
    </div>
</template>

<script>
export default {
    name: 'selectCust',
    model: {
        prop: 'msg',
        event: 'ee'
    },
    props: {
        msg: {}
    },
    data() {
        return {
            isMore: true,//false 为开启加载更多
            loading: true,
            popupVisible: false,
            account: JSON.parse(this.$getCookie('account')),
            inputValue: '', // 搜索关键字
            pageIndex: 1,
            pageSize: 20,
            popupArr: [],
            currentObj: this.msg // 当前选中项
        }
    },
    created() {
        // console.log(this.currentObj)
    },
    methods: {
        loadMore() {
            console.log("more")
            this.pageIndex++
            let data = {
                fid: this.account.fid,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$http.get('/api/SelectCustomer', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let data = res.data.DataList;
                    // console.log(list)
                    if (data.length === 0) {
                        this.loading = false;
                        this.isMore = true;
                        // this.pageIndex = 1
                        return;
                    }
                    this.popupArr = this.popupArr.concat(data);
                } else {
                    this.$toast(res.data.message);
                }
            }, res => { });
        },
        open() {
            // console.log(this.popupArr)
            this.popupVisible = true
            if (this.pageIndex !== 1) { return }
            let data = {
                fid: this.account.fid,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$http.get('/api/SelectCustomer', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let list = res.data.DataList;
                    // console.log(list)
                    if (list.length > 0) {
                        this.popupArr = list
                        this.isMore = false
                    }
                } else {
                    this.$toast(res.data.message);
                }
            }, res => { });
        },
        searchCust() {
            this.pageIndex = 1
            let data = {
                fid: this.account.fid,
                inputValue: this.inputValue,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$http.get('/api/SelectCustomer', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let list = res.data.DataList;
                    // console.log(list)
                    this.popupArr = list
                    if (list.length < 20) {
                        this.loading = false;
                    }
                } else {
                    this.$toast(res.data.message);
                }
            }, res => { });
        },
        surePopup() {
            this.popupVisible = false
            this.$emit('ee', this.currentObj)
        }
    }
}
</script>
