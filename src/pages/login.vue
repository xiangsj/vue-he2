<template>
    <div class="login">
        <div class="title">耐喜软件手机端
            <div>用户登录</div>
        </div>

        <div style="margin:2px 0 20px;">
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
            <mt-button size="small" type="default" @click="reset()">重置</mt-button>
        </div>

        <mt-popup v-model="popupVisible" position="right" class="modelRight">
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
import { setTitle, setCookie } from "@/libs/utils.js";
// import { Popup } from 'mint-ui';

// Vue.component(Popup.name, Popup);
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
        setTitle(" 用户登录 ")
    },
    methods: {
        surePopup(){
            this.popupVisible = false;
            this.popupArr.forEach((item)=>{
                if(item.value == this.popupVal){
                    this.accountName = item.label;
                }
            });
        },
        selectAccount() {
            this.$http.get('/api/DealerComPany', { params: {} }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let list = res.data.DataList;
                    if (list === 0) { return }
                    let newArr = [];
                    list.forEach((item,index)=>{
                        newArr.push({
                            value:item.Fid+'',
                            label:item.CompanyName
                        })
                    });
                    this.popupArr = newArr;
                    this.popupVisible = true;
                } else {
                    this.$toast(res.data.message);
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
            let data = {
                fid: this.popupVal,
                loginUser: this.username,
                pwd: this.pwd
            }
            this.$http.get('/api/Login', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    console.log(res)
                } else {
                    this.$toast(res.data.message);
                }

                // // console.log(res)
                // Indicator.close();
                // setCookie("username", this.username);

                // if (res.status == 'E') {
                //     Toast(res.message);
                // } else {
                //     this.$emit("loginSuccess")
                // }
            }, res => {});
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    .title {
        text-align: center;
        font-size: 28px;
        padding: 15px 0;
        color: #26a2ff;
        >div {
            font-size: 18px;
            color: #222;
            margin-top: 20px;
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