<template>
    <div class="search">
        <div class="text-center">
            <img class="logo" :src="getLogoUrl()">
        </div>

    </div>
</template>

<script>
import { getCookie } from "@/libs/utils.js";
import { Indicator } from 'mint-ui';
export default {
    name: 'search',
    data() {
        return {
            selected: '',
            tabsFixed:[],//前面常用固定项
            tabsMore: [],//后面动态

            mSortNo: '',
            username: '',
        }
    },
    created() {
        Indicator.open();
        if(!this.$route.params.id){
            alert(" no id ");
            return;
        }
        this.mSortNo = this.$route.params.id;
        this.getTabs();
        this.getTabsFixed();
        console.log(this.mSortNo)
    },
    methods: {
        getLogoUrl(){
            return getCookie("logoUrl");
        },
        getTabsFixed(){
            this.$http.get('/api/MainSearchTitle', {params:{}}).then(res => {
                // console.log(" 自定义导航 ")
                // console.log(res.DataList)
                this.tabsFixed = res.DataList;
                //匹配要显示中的首项
                let show = res.DataList.filter(function(item,index){
                    return item.IsShow == true;
                });
                // console.log(show)
                if(show.length===0){return;}
                this.selected = show[0].Name;//首项显示
            }, res => {
                // error callback
            });
        },
        getTabs() {
            this.$http.get('/api/DesignField', {params:{}}).then(res => {
                Indicator.close();
                // console.log(" 自定义导航 ")
                // console.log(res.DataList)
                this.tabsMore = res.DataList;
            }, res => {
                // error callback
            });
        },
    },
    components: {

    }
}
</script>

<style lang="less">

</style>
