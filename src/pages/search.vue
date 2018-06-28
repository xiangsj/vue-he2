<template>
    <div class="search">
        <div class="text-center">
            <img class="logo" :src="getLogoUrl()">
        </div>
        <mt-navbar class="navbar" v-model="selected">
            <mt-tab-item :id="item.Name" v-for="(item,index) in tabsFixed" :key="'a'+index" v-if="item.IsShow">{{item.Name}}</mt-tab-item>
            <!-- <mt-tab-item id="2">编号</mt-tab-item>
            <mt-tab-item id="3">Vin码</mt-tab-item> -->
            <mt-tab-item :id="'tab'+item.FID" v-for="(item,index) in tabsMore" :key="'b'+index">{{item.ShowCaption}}</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item :id="item.Name" v-for="(item,index) in tabsFixed" :key="'a'+index" v-if="item.IsShow">
                <!-- <search-body-1 :mSortNo="mSortNo"></search-body-1> -->
                <component :mSortNo="mSortNo" v-bind:is="'search-body-' + parseInt(index+1)"></component>  
            </mt-tab-container-item>

            <!-- <mt-tab-container-item id="2">
                <search-body-2 :mSortNo="mSortNo"></search-body-2>
            </mt-tab-container-item>

            <mt-tab-container-item id="3">
                <search-body-3 :mSortNo="mSortNo"></search-body-3>
            </mt-tab-container-item> -->

            <mt-tab-container-item :id="'tab'+item.FID" v-for="(item,index) in tabsMore" :key="'b'+index">
                <search-body-4 :mSortNo="mSortNo" :itemData="item"></search-body-4>
            </mt-tab-container-item>
        </mt-tab-container>

    </div>
</template>

<script>
import { getCookie } from "@/libs/utils.js";

import searchBody1 from './searchBody1'
import searchBody2 from './searchBody2'
import searchBody3 from './searchBody3'
import searchBody4 from './searchBody4'

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
            // /api/MainSearchTitle?weiXinCode=gh_6297f82da263
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
        'search-body-1': searchBody1,
        'search-body-2': searchBody2,
        'search-body-3': searchBody3,
        'search-body-4': searchBody4,
    }
}
</script>

<style lang="less">

</style>
