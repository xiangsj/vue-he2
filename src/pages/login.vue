<template>
    <div class="login">
        <div class="title">耐喜软件手机端
            <div>用户登录</div>
        </div>

        <div style="margin:2px 0 20px;">
            <div @click="popupVisible = true">
                <mt-cell title="账套" is-link value="请选择账套">
                    <span v-if="account != ''">{{account}}</span>
                </mt-cell>
            </div>

            <mt-field class="inputRight" label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>

            <mt-field class="inputRight" label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
        </div>

        <div class="btns text-center">
            <mt-button size="small" type="primary" @click="submit()">登录</mt-button>
            <mt-button size="small" type="default" @click="reset()">重置</mt-button>
        </div>

<mt-popup
  v-model="popupVisible" position="right">
  ...
</mt-popup>
    </div>
</template>

<script>
import { setTitle, setCookie } from "@/libs/utils.js";

export default {
    name: 'home',
    data() {
        return {
            account: '',
            username: 'admin',
            pwd: 'admin',
            popupVisible: false
        }
    },
    created() {
        setTitle(" 用户登录 ")
    },
    methods: {
        selectAccount(){},
        reset() {
            this.username = this.pwd = '';
        },
        submit() {
            if (this.username === '') {
                Toast("请输入用户名")
                return;
            }
            if (this.pwd === '') {
                Toast("请输入密码")
                return;
            }
            let data = {
                username: this.username,
                pwd: this.pwd
            }
            Indicator.open();
            this.$http.get('/api/User', { params: data }).then(res => {
                // console.log(res)
                Indicator.close();
                setCookie("username", this.username);

                if (res.status == 'E') {
                    Toast(res.message);
                } else {
                    this.$emit("loginSuccess")
                }
            }, res => {
                // error callback
            });
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