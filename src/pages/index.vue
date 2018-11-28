<template>
    <div class="index">
        <div class="text-center">欢迎使用耐喜软件手机APP</div>
        <mt-field class="inputRight" label="手机令牌" placeholder="请输入手机令牌" v-model="inputToken"></mt-field>
        <div class="sure">
            <mt-button @click.native="handleClick" type="primary" size="large">确定</mt-button>
        </div>
    </div>
</template>

<script>
import { setCookie, clearCookie } from "@/libs/utils.js";

export default {
    name: 'index',
    data() {
        return {
            // inputToken: '7241DCA3-DA40-4AF9-86B0-D9AC30115764',
            // inputToken: '1A2B3C',
            inputToken: '',
            isOpenToken: true,
            token: this.$getCookie('token')
        }
    },
    created() {
        // clearCookie();
        // log(this.token)
        // setCookie('apps', ['index','login','main'])
        if (this.token && this.token !== '') {
            this.checkToken()
        }
    },
    methods: {
        checkToken() {
            this.$http.get('/api/TokenCheck', { params: { token: this.token } }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status && res.data.DataList.length > 0) {
                    // console.log(res.data.DataList)
                    let obj = res.data.DataList[0]
                    if (!obj.IsForbid) {
                        let EndDate = new Date(obj.EndDate)
                        // log(EndDate)
                        // log(new Date())
                        if (EndDate > new Date()) {
                            this.$router.push("/login");
                        } else {
                            this.$toast('令牌已过期')
                        }
                    } else {
                        this.$toast('令牌已禁用')
                    }
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
        handleClick() {
            if (this.inputToken == '') {
                this.$toast('请输入令牌');
                return
            }
            this.$http.get('/api/TokenCheck', { params: { token: this.inputToken } }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    if (res.data.DataList.length === 0) { return; }
                    setCookie("token", this.inputToken);
                    this.$router.push("/login");
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        }
    }
}
</script>

<style lang="less" scoped>
.index {
    // padding: 10px 0;
    >.text-center {
        font-size: 23px;
        font-weight: bold;
        padding: 10px 0;
        border-bottom: 15px solid #f7f8f9;
        margin-bottom: 10px;
    }
    .sure {
        margin: 55px 15px 0;
    }
}
</style>

