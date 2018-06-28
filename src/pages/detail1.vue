<template>
    <div class="detail">
        <div class="text-center">
            <img class="logo" :src="getLogoUrl()">
        </div>
        <div class="tableWrap">
            <table class="hasBorder">
                <tr>
                    <td width=77>品牌</td>
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

            <table class="detailOnly" style="margin-top:10px;" v-for="(item,index) in dom" :key="index">
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

                    <tr v-for="(item2,index2) in domAdd" :key="index2">
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

    </div>
</template>

<script>
import { getCookie } from "@/libs/utils.js";
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    name: 'detail',
    data() {
        return {
            obj: {},
            dom: '',
            domAdd: []
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            Indicator.open();
            // console.log(' jjjjjjj ')
            let obj = {}
            try {
                obj = JSON.parse(this.$route.params.string);
                this.obj = obj;
            } catch (e) {
                this.nothing();
                return;
            }
            // console.log(this.obj)
            this.$http.get('/api/ProductDetail', { params: { fid: obj.FID } }).then(res => {
                Indicator.close();
                // console.log(" iiiiiiiiiiiiii ")
                // console.log(res)
                try {
                    if (res.DataList.length > 0) {
                        this.dom = res.DataList;
                        if (!res.resultString) {
                            return;
                        }
                        this.domAdd = JSON.parse(res.resultString);
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