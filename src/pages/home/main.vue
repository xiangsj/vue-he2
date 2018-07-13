<template>
    <div class="homeMain">
        <header>
            <span>欢迎
                <span style="color:#222;font-weight:bold">{{account.CNEmpName}}</span> 登录
            </span>
            <span class="pull-right">帐套：{{account.resultString}}</span>
        </header>
        <section>
            <ul>
                <li @click="$router.push('/home/orderSearch')">
                    <span>
                        <i class="iconfont icon-order-search"></i>
                    </span>
                    <div>订单查询</div>
                </li>
                <li>
                    <span style="background:#6e05d6">
                        <i class="iconfont icon-place-order"></i>
                    </span>
                    <div>销售下单</div>
                </li><br>
                <li>
                    <span style="background:#008cee">
                        <i class="iconfont icon-stock-search"></i>
                    </span>
                    <div>库存查询</div>
                </li>
            </ul>
        </section>
        <footer>
            <mt-button size="large" @click="loginOut()">退出</mt-button>
        </footer>
    </div>
</template>

<script>
import { removeCookie, clearCookie } from "@/libs/utils.js";

export default {
    name: 'homeMain',
    data() {
        return {
            account: JSON.parse(this.$getCookie('account'))
        }
    },
    created() {
        this.$setTitle('')
        // log(this.account)
    },
    methods: {
        loginOut() {
            removeCookie('account');
            this.$router.push("/login");
        }
    }
}
</script>

<style lang="less">
.homeMain {
    // border: 1px solid red;
    background-color: #f7f8f9;
    height: 100%;
    section {
        >ul {
            // border:1px solid red;
            text-align: center;
            width: 280px;
            margin: 0 auto;
            >li {
                float: left;
                width: 120px;
                height: 120px;
                font-size: 15px;
                border-radius: 6px;
                text-align: center;
                margin: 8px;
                background: #fff;
                margin-right: 10px;
                color: #606266;
                >span {
                    display: inline-block;
                    margin: 15px auto 8px;
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    border-radius: 50%;
                    background: #f60;
                    color: #fff;
                    i {
                        font-size: 30px;
                    }
                }
                &:active {
                    background: #f7f8f9;
                }
            }
        }
    }
    header {
        padding: 13px 15px;
        margin-bottom: 7px;
        background: #fff;
    }
    footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 12px;
        button {
            background: #fff;
        }
    }
}
</style>