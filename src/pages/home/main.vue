<template>
  <div class="homeMain">
    <header>
      <span>
        欢迎
        <span style="color:#222;font-weight:bold">{{account.CNEmpName}}</span> 登录
      </span>
      <span class="pull-right">帐套：{{account.resultString}}</span>
    </header>
    <section>
      <ul>
        <li @click="$router.push('/home/orderSearch')" v-if="hasApp.indexOf('orderSearch') !== -1">
          <span>
            <i class="iconfont icon-order-search"></i>
          </span>
          <div>订单查询</div>
        </li>
        <li @click="$router.push('/home/salesOrder')" v-if="hasApp.indexOf('salesOrder') !== -1">
          <span style="background:#6e05d6">
            <i class="iconfont icon-place-order"></i>
          </span>
          <div>销售下单</div>
        </li>
        <br>
        <li
          @click="$router.push('/home/stockQuery/search')"
          v-if="hasApp.indexOf('stockQuery') !== -1"
        >
          <span style="background:#FF7165">
            <i class="iconfont icon-stock-search"></i>
          </span>
          <div>库存查询</div>
        </li>
        <li @click="$router.push('/home/addCompany')" v-if="hasApp.indexOf('addCompany') !== -1">
          <span style="background:#008cee">
            <i class="iconfont icon-company"></i>
          </span>
          <div>创建往来单位</div>
        </li>
        <li
          @click="$router.push('/home/accountQuery/search')"
          v-if="hasApp.indexOf('accountQuery') !== -1"
        >
          <span style="background:#BFBF17">
            <i class="iconfont icon-money"></i>
          </span>
          <div>公司台账</div>
        </li>
      </ul>
    </section>
    <footer>
      <mt-button size="large" @click="loginOut()">退出</mt-button>
    </footer>
  </div>
</template>

<script>
import { setCookie, removeCookie } from "@/libs/utils.js";

export default {
    name: 'homeMain',
    data() {
        return {
            userObj: {
                EmpID: JSON.parse(this.$getCookie("account")).EmpID,
                CNEmpName: JSON.parse(this.$getCookie("account")).CNEmpName
            },
            account: JSON.parse(this.$getCookie('account')),
            allApp: [
                {
                    name: 'addCompany',
                    code: 'BF001'
                },
                {
                    name: 'salesOrder',
                    code: 'SC010'
                },
                {
                    name: 'orderSearch',
                    code: 'SC010'
                },
                {
                    name: 'stockQuery',
                    code: 'QY100'
                },
                {
                    name: 'accountQuery',
                    code: 'QY112'
                }
            ],
            hasApp: [],
            appList: [
                // "QY100",
                // "QY112",
                // "SC010"
            ]
        }
    },
    created() {
        this.$setTitle(this.account.resultString)
        // log(this.account)
        this.getApp()
    },
    methods: {
        getApp() {
            this.$http
        .get("/api/LoginMenu", {
          params: { fid: this.account.fid, empId: this.userObj.EmpID }
        })
        .then(
          res => {
            if (res.data.status.toString() === this.GLOBAL.status) {
              let DataList = res.data.DataList;
            //   console.log(DataList)
              this.appList = DataList    
              
              let arr = ['main']
                this.appList.forEach(item => {
                    this.allApp.forEach(item2 => {
                        if (item == item2.code) {
                            arr.push(item2.name)
                        }
                    })
                })
                this.hasApp = arr
                setCookie("apps", arr.join(','));
                    
            } else {
              this.$messageBox(res.data.message);
            }
          },
          res => {}
        );
        },
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
        font-size: 15px;
        box-shadow: 0 3px 3px 0 rgba(50,50,50,0.06); 
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