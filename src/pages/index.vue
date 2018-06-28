<template>
    <div class="index">
        <template v-if="!isLogin">
            <div class="text-center">
                <img class="logo" :src="logoUrl">
                <ul class="nav">
                    <li v-for="(item,index) in homeList" :key="index" @click="goSearch(item.FID)">
                        <img :src="item.SortPath">
                        <div>{{item.SortName}}</div>
                    </li>
                </ul>
                <div class="footer">{{company}}</div>
            </div>
            <router-view></router-view>
        </template>
        <login v-else @loginSuccess="getData"></login>
    </div>
</template>

<script>
import { setCookie, getCookie, clearCookie, setTitle } from "@/libs/utils.js";
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';

import login from './login'
export default {
    name: 'index',
    data() {
        return {
            homeList: [],
            logoUrl: '',
            company: '',
            isLogin: false
        }
    },
    created() {
        clearCookie();
        Indicator.open();
        this.isPower();
    },
    methods: {
        getData() {
            // console.log("jjj ")
            this.getMenu();
            this.getLogin();
            this.isLogin = false;
        },
        isPower() {
            let weiXinCode = this.$route.query.weiXinCode;
            this.$http.get('/api/Login', { params: { weiXinCode: weiXinCode } }).then(res => {
                Indicator.close();
                /**
                 * 1.全部开放
                 * 2.没开放，要登录 (CanAnonymous 为 false 时要登录)
                 * 3.没开放，禁止
                */
                if (res.status == "S") {
                    setCookie("code", weiXinCode);
                    this.getMenu();
                    this.getLogin();
                } else {
                    if (!res.DataList[0].CanAnonymous) {
                        // 没开放，要登录
                        this.isLogin = true;
                        setCookie("code", weiXinCode);
                    } else {
                        // 没开放，禁止
                        MessageBox.alert(res.message).then(action => {
                            this.$router.go(-1);
                        });
                    }
                }
            }, res => {
                // error callback
            });
        },
        goSearch(FID) {
            this.$router.push('/home/search/' + FID)
        },
        // console.log(" 首页产品按钮 ")
        getMenu() {
            let data = {
                registerCode: getCookie("username") || ''
            }
            this.$http.get('/api/ProdSort', { params: data }).then(res => {
                this.homeList = res.DataList;
                Indicator.close();
            }, res => {
                // error callback
            });
        },
        // console.log(" 登录信息 ")
        getLogin() {
            this.$http.get('/api/CustomerList', { params: {} }).then(res => {
                this.logoUrl = res.DataList[0].LogoPath;
                this.company = res.DataList[0].CustName;
                setCookie("logoUrl", this.logoUrl);
                setCookie("company", this.company);
                setTitle(this.company);
            }, res => {
                // error callback
            });
        }
    },
    components: {
        'login': login
    }
}
</script>

<style lang="less">

</style>

