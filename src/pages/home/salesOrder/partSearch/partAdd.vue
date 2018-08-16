<template>
    <div class="partAdd">
        <mt-header title="配件添加">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <section>
            <div class="partAddList" v-for="(item,index) in partData" :key="index">

                <div class="groupTitle text-center">
                    <span>配件 {{index+1}}</span>
                </div>
                <part-input :item.sync="item"></part-input>

            </div>
            <div class="getMore text-center">
                <span v-if="loading">努力加载中...</span>
                <span v-else>没有更多了</span>
            </div>
        </section>
        <footer class="btnFooter btnNum2">
            <mt-button type="primary" @click="submit()">确定</mt-button>
            <mt-button @click="$router.go(-1)">取消</mt-button>
        </footer>
    </div>
</template>

<script>
import { setCookie } from "@/libs/utils.js";
import partInput from '@/components/partInput.vue'
export default {
    name: 'partAdd',
    data() {
        return {
            loading: false,
            account: JSON.parse(this.$getCookie('account')),
            custObj: JSON.parse(this.$getCookie('custObj')),
            pageIndex: 1,
            pageSize: 200,
            partData: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            let obj = {}
            this.loading = true
            // log(this.$route.params.string)
            // log(this.$route.params.string.replace(/&&/g, "#"))

            let str = this.$route.params.string.replace(/&&/g, "#")
            let data = {
                fid: this.account.fid,
                custFid: this.custObj.Fid,
                provItemNoAndFid: str,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            log(data)
            this.$http.get('/api/FittingsSelectReturn', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    this.loading = false
                    let list = res.data.DataList;
                    console.log(list)
                    let newArr = []
                    list.forEach(item => {
                        item['OrgSalePrice'] = ''
                        item['SalePrice'] = ''
                        item['SaleQty'] = ''
                        item['Memo'] = ''
                        newArr.push(item)
                    })
                    this.partData = newArr
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
        submit() {
            log(this.partData)
            // return

            let OrgSalePrice = this.partData.filter(item => {
                return item.OrgSalePrice == ''
            })
            // log(OrgSalePrice)  || !/^[0-9]*$/.test(OrgSalePrice[0].OrgSalePrice)
            if (OrgSalePrice.length > 0) {
                this.$toast('有 ' + OrgSalePrice.length + ' 处开单价格没有录入')
                return
            }
            // 
            let SalePrice = this.partData.filter(item => {
                return item.SalePrice == ''
            })
            if (SalePrice.length > 0) {
                this.$toast('有 ' + SalePrice.length + ' 处实际销售单价没有录入')
                return
            }
            //
            let SaleQty = this.partData.filter(item => {
                return item.SaleQty == ''
            })
            if (SaleQty.length > 0) {
                this.$toast('有 ' + SaleQty.length + ' 处销售数量没有录入')
                return
            }

            let parts = this.$getCookie('partsObj') || '[]'
            let Arr = JSON.parse(parts)
            // log(Arr)
            if (Arr.length === 0) {
                setCookie("partsObj", this.partData);
            } else {
                let newArr = Arr.concat(this.partData)
                setCookie("partsObj", newArr);
                // log(newArr)
            }
            this.$router.push('/home/salesOrder')
        }
    },
    components: {
        'part-input': partInput
    },
    watch: {
        // partData: {
        //     handler(curVal, oldVal) {
        //         log(curVal)
        //     },
        //     deep: true
        // }
    }
}
</script>

<style lang="less" scoped>
.partAdd {
    // border: 1px solid blue;
    // position: relative;
    height: 100%;
    background-color: #f7f8f9;
    section {
        // border: 1px solid red;
        overflow: auto;
        position: absolute;
        left: 0;
        top: 40px;
        right: 0;
        bottom: 62px;
        padding-bottom: 30px;
        z-index: 1;
        -webkit-overflow-scrolling: touch;
        .partAddList {
            margin-bottom: 2px;
        }
    }
}
</style>