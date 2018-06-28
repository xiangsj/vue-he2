<template>
    <div class="detail">
        <div class="text-center">
            <img class="logo" :src="getLogoUrl()">
        </div>
        <div class="tableWrap">
            <table class="hasBorder" style="margin-top:5px;">
                <tr>
                    <td width=100>品牌</td>
                    <td>{{obj.BrandName}}</td>
                </tr>
                <tr>
                    <td>车型</td>
                    <td>{{obj.VehicleName}}</td>
                </tr>
                <tr>
                    <td>车系</td>
                    <td>{{obj.StyleName}}</td>
                </tr>
            </table>

            <table class="noBorder" style="margin-top:10px;" v-infinite-scroll="loadMore"  infinite-scroll-disabled="isMore"
 infinite-scroll-distance="10">
                <tr v-for="(item,index) in dom" :key="index" @click="openDetail(item)">
                    <td width=100>
                        <img class="listPic" v-if="item.MainPath && item.MainPath !== ''" :src="item.MainPath">
                        <div v-else class="text-center noPic">暂无图片</div>
                    </td>
                    <td>
                        <div>{{item.Brand}}</div>
                        <div>{{item.Item_C_Name}}</div>
                        <div>{{item.Item_C_Spec}}</div>
                    </td>
                </tr>
            </table>

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
            obj: {},
            dom: [],
            pageIndex: 1,
            pageSize: 8,
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            // console.log(' jjjjjjj ')
            
            let obj = {}
            try {
                // console.log(JSON.parse(this.$route.params.string))
                obj = JSON.parse(this.$route.params.string);
                this.obj = obj;
            } catch (e) {
                this.nothing();
                return;
            }

            let data = {
                searchWords: this.obj.keywords,
                brandID: this.obj.BrandID,
                vehicleID: this.obj.VehicleID,
                styleID: this.obj.StyleID,
                mSortNo: this.obj.mSortNo,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$http.get('/api/ProductSearchByCarStyle', { params: data }).then(res => {
                // console.log(" iiiiiiiiiiiiii ")
                try {
                    if (res.DataList.length > 0) {
                        this.dom = res.DataList;
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
        getLogoUrl() {
            return getCookie("logoUrl");
        },
        loadMore() {
            // log("uuu");
            if (!this.loading) { return; }
            this.pageIndex++;
            let data = {
                searchWords: this.obj.keywords,
                brandID: this.obj.BrandID,
                vehicleID: this.obj.VehicleID,
                styleID: this.obj.StyleID,
                mSortNo: this.obj.mSortNo,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                registerCode: getCookie("username")
            }
            this.$http.get('/api/ProductSearchByCarStyle', { params: data }).then(res => {
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
        },
        openDetail(item) {
            // console.log(item)
            let data = {
                FID: item.FID,
                BrandName: this.obj.BrandName,
                VehicleName: this.obj.VehicleName,
                StyleName: this.obj.StyleName,
            }
            let url = '/home/detail1/' + JSON.stringify(data);
            this.$router.push(url)
        }
    }
}
</script>

<style lang="less">

</style>