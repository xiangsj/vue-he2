<template>
    <div class="viewPriceLog popupSelect">
        <mt-popup v-model="popupVisible" position="right" class="modelRight">
            <mt-header title="历史记录">
                <router-link to="" slot="left">
                    <mt-button icon="back" @click="popupVisible = false">返回</mt-button>
                </router-link>
            </mt-header>
            <section>

                <div class="groupTitle">销售历史
                    <span>（仅显示最近5条）</span>
                </div>
                <template v-for="(item,index) in saleLogArr">
                    <mt-cell :key="'a'+index" :title="item.CreateDate.split(' ')[0]" :value="Number(item.OrgSalePrice).toFixed(2)"></mt-cell>
                    <!-- <mt-cell :key="'a'+index" :title="$moment(item.CreateDate).format('YYYY-MM-DD')" :value="Number(item.OrgSalePrice).toFixed(2)"></mt-cell> -->
                </template>
                <div class="getMore text-center">
                    <span v-if="loading1">努力加载中...</span>
                    <span v-else>没有更多了</span>
                </div>

                <div class="groupTitle">采购历史
                    <span>（仅显示最近5条）</span>
                </div>
                <template v-for="(item,index) in buyLogArr">
                    <mt-cell :key="'b'+index" :title="item.WHName.split(' ')[0]" :value="Number(item.InPrice).toFixed(2)"></mt-cell>
                </template>
                <div class="getMore text-center">
                    <span v-if="loading2">努力加载中...</span>
                    <span v-else>没有更多了</span>
                </div>

            </section>

        </mt-popup>
    </div>
</template>

<script>
export default {
    name: 'viewPriceLog',
    data() {
        return {
            loading1: false,
            loading2: false,
            popupVisible: false,
            account: JSON.parse(this.$getCookie('account')),
            // custObj: JSON.parse(this.$getCookie('custObj')) || {},
            custObj: {},

            saleLogArr: [],
            buyLogArr: []
        }
    },
    created() {
        // console.log(this.custObj)
        this.custObj = this.$getCookie('custObj') ? JSON.parse(this.$getCookie('custObj')) : {}
    },
    methods: {
        open(provItemNo) {
            if (provItemNo == '') { return }
            this.popupVisible = true
            this.getSaleLog(provItemNo)
            this.getBuyLog(provItemNo)
        },
        getSaleLog(provItemNo) {
            this.loading1 = true
            let data = {
                fid: this.account.fid,
                custFid: this.custObj.Fid,
                provItemNo: provItemNo
            }
            // log(data)
            // return
            this.$http.get('/api/SalesHistory', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    this.loading1 = false
                    let list = res.data.DataList;
                    console.log(list)
                    if (list.length === 0) {
                        // this.$toast('没有查到销售历史')
                        // log('jjjjj')
                    }
                    this.saleLogArr = list
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
        getBuyLog(provItemNo) {
            this.loading2 = true
            let data = {
                fid: this.account.fid,
                provItemNo: provItemNo
            }
            // log(data)
            // return
            this.$http.get('/api/BuyHistory', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    this.loading2 = false
                    let list = res.data.DataList;
                    // console.log(list)
                    if (list.length === 0) {
                        // this.$toast('没有查到销售历史')
                        // log('jjjjj')
                    }
                    this.buyLogArr = list
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
    }
}
</script>

<style lang="less" scoped>
.viewPriceLog {
    section {
        // border: 1px solid red;
        bottom: 0;
        background-color: #f7f8f9;
        padding-bottom: 20px;
    }
}
</style>
