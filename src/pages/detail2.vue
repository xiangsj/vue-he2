<template>
    <div class="detail">
        <div class="text-center">
            <img class="logo" :src="getLogoUrl()">
        </div>
        <div class="tableWrap">
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="isMore" infinite-scroll-distance="10">
                <table class="detailOnly" style="margin:15px 0 30px;" v-for="(item,index) in dom" :key="index">
                    <caption>
                        <span v-if="item.MainPath">
                            <img :src="item.MainPath">
                        </span>
                        <span v-else class="noPic">暂无主图</span>

                        <span v-if="item.SubPath">
                            <img :src="item.SubPath">
                        </span>
                        <span v-else class="noPic">暂无辅图</span>
                    </caption>

                    <tbody>
                        <tr>
                            <td style="width:88px;">产品名称</td>
                            <td>{{item.Item_C_Name}}</td>
                        </tr>
                        <tr>
                            <td>厂家编号</td>
                            <td>{{item.ProvItemNo}}</td>
                        </tr>
                        <tr>
                            <td>规格型号</td>
                            <td>{{item.Item_C_Spec}}</td>
                        </tr>

                        <tr v-for="(item2,index2) in JSON.parse(item.resultString)" :key="index2">
                            <td>{{item2.Name}}</td>
                            <td>{{item2.Value}}</td>
                        </tr>

                        <tr v-for="(item3,index3) in item.ProdItemReplace.split(',')">
                            <td>
                                <span v-if="index3==0">替代品牌</span>
                            </td>
                            <td>{{item3}} </td>
                        </tr>

                        <tr v-for="(item3,index3) in item.ZhujiNo.split(',')">
                            <td>
                                <span v-if="index3==0">主机编号</span>
                            </td>
                            <td>{{item3}} </td>
                        </tr>

                        <tr v-for="(item3,index3) in item.CanUseStyle.split(',')">
                            <td>
                                <span v-if="index3==0">适用车型</span>
                            </td>
                            <td>{{item3}} </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div class="getMore text-center">
                <span v-if="loading">努力加载中...</span>
                <span v-else>没有更多了</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getCookie } from "@/libs/utils.js";
import { MessageBox } from 'mint-ui';
export default {
    name: 'detail',
    data() {
        return {
            isMore: true,//false 为加载更多
            loading: true,
            dom: [],
            pageIndex: 1,
            pageSize: 3,
        }
    },
    created() {
        let strArr = this.$route.params.string.split('&&');
        let data = {
            inputValue: strArr[0],
            mSortNo: strArr[1],
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        }
        this.$http.get('/api/ProductSearchByNo', { params: data }).then(res => {
            try {
                if (res.DataList.length > 0) {
                    this.dom = res.DataList;
                    // console.log(" jjjjjjjjjjooo ")
                    // console.log(res);
                    this.isMore = false;//开启加载更多
                } else {
                    this.nothing();
                }
            } catch (e) {
                this.nothing();
            }
        }, res => {
            // error callback
        });
    },
    methods: {
        getLogoUrl() {
            return getCookie("logoUrl");
        },
        loadMore() {
            if (!this.loading) { return; }
            this.pageIndex++;
            let strArr = this.$route.params.string.split('&&');
            let data = {
                inputValue: strArr[0],
                mSortNo: strArr[1],
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                registerCode: getCookie("username")
            }
            // console.log(data)
            this.$http.get('/api/ProductSearchByNo', { params: data }).then(res => {
                let data = res.DataList;
                if (data.length === 0) {
                    this.loading = false;
                    return;
                }
                this.dom = this.dom.concat(data);
            }, res => {
                // error callback
            });
        },
        nothing() {
            MessageBox.alert('没有查到数据，返回重新查询').then(action => {
                this.$router.go(-1);
            });
        }
    }
}
</script>

<style lang="less">

</style>