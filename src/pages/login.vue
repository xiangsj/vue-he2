<template>
    <div class="login">
        <div class="title">耐喜软件手机端
            <div>用户登录</div>
            <span class="relogin" @click="relogin()">
                <i class="iconfont icon-token"></i>
            </span>
        </div>

        <div style="margin:2px 0 50px;">
            <div @click="selectAccount()">
                <mt-cell title="账套" is-link value="请选择账套">
                    <span v-if="accountName != ''">{{accountName}}</span>
                </mt-cell>
            </div>

            <mt-field class="inputRight" label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>

            <mt-field class="inputRight" label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
        </div>

        <div class="btns text-center">
            <mt-button size="small" type="primary" @click="toLogin()">登录</mt-button>
            <mt-button size="small" type="default" @click="reset()">退出</mt-button>
        </div>

        <mt-popup v-model="popupVisible" position="right" class="modelRight">
            <mt-header title="选择帐套">
                <router-link to="" slot="left">
                    <mt-button icon="back" @click="popupVisible = false">返回</mt-button>
                </router-link>
            </mt-header>
            <div class="">
                <mt-radio title="" align="right" v-model="popupVal" :options="popupArr"> </mt-radio>
                <div class="buttonFoot">
                    <mt-button size="large" type="primary" @click="surePopup()">确定</mt-button>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import { setCookie, clearCookie } from "@/libs/utils.js";

export default {
    name: 'home',
    data() {
        return {
            accountName: '',
            username: 'lwp',
            pwd: '888888',

            popupVisible: false,
            popupArr: [],
            popupVal: '1'
        }
    },
    created() {
        this.$setTitle('用户登录')
    },
    methods: {
        surePopup() {
            this.popupVisible = false;
            this.popupArr.forEach((item) => {
                if (item.value == this.popupVal) {
                    this.accountName = item.label;
                }
            });
        },
        selectAccount() {
            this.popupVisible = true
            this.$http.get('/api/DealerComPany', { params: {} }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let list = res.data.DataList;
                    if (list === 0) { return }
                    let newArr = [];
                    list.forEach((item, index) => {
                        newArr.push({
                            value: item.Fid + '',
                            label: item.CompanyName
                        })
                    });
                    this.popupArr = newArr
                } else {
                    this.$toast(res.data.message)
                }
            }, res => { });
        },
        reset() {
            this.username = this.pwd = ''
        },
        toLogin() {
            if (this.accountName === '') {
                this.$toast("请选择帐套")
                return;
            }
            if (this.username === '') {
                this.$toast("请输入用户名")
                return;
            }
            if (this.pwd === '') {
                this.$toast("请输入密码")
                return;
            }
            let fid = this.popupVal
            let data = {
                fid: fid,
                loginUser: this.username,
                pwd: this.pwd
            }
            this.$http.get('/api/Login', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    // console.log(res.data)
                    let toCookie = res.data.DataList
                    toCookie.loginUser = this.username
                    toCookie.resultString = res.data.resultString
                    toCookie.fid = fid
                    console.log(toCookie)
                    setCookie("account", toCookie);
                    this.$router.push("/home/main");
                } else {
                    this.$toast(res.data.message);
                }
            }, res => { });
        },
        relogin() {
            this.$messageBox.confirm('确定重置令牌?').then(action => {
                clearCookie();
                this.$router.push('/');
            });
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    .title {
        text-align: center;
        font-size: 25px;
        padding: 10px 0;
        color: #26a2ff;
        position: relative;
        .relogin {
            position: absolute;
            width: 30px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            top: 14px;
            right: 15px;
            i {
                font-size: 22px;
                color: #909399;
            }
        }
        >div {
            border-top: 15px solid #f7f8f9;
            font-size: 18px;
            color: #222;
            margin-top: 10px;
            padding-top: 12px;
        }
    }
    .btns {
        button {
            margin: 0 10px;
            width: 110px;
            height: 40px;
        }
    }
}
</style>