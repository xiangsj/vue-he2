<template>
    <div class="accountSearch">
        <mt-header title="台账查询">
            <router-link to="/home/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>

        <section>
            <div class="bg-white">
                <div @click="$refs.pickerCompany.open()">
                    <mt-cell class="" title="公司抬头" is-link value="请选择">
                        <span class="value" v-if="companyObj.CompanyName !== ''">{{companyObj.CompanyName}}</span>
                    </mt-cell>
                </div>
                <div @click="dateBeginShow = true">
                    <mt-cell title="开始日期" is-link value="请选择">
                        <span class="value" v-if="dateBegin != ''">{{dateBegin}}</span>
                    </mt-cell>
                </div>
                <div @click="dateEndShow = true">
                    <mt-cell title="结束日期" is-link value="请选择">
                        <span class="value" v-if="dateEnd != ''">{{dateEnd}}</span>
                    </mt-cell>
                </div>
                
            </div>
        </section>

        <footer class="btnFooter">
            <mt-button type="primary" @click="submit()">查询</mt-button>
        </footer>

        <calendar v-model="dateBeginShow" :defaultDate="new Date(dateBegin)" @change="dateBeginChange"></calendar>
        <calendar v-model="dateEndShow" :defaultDate="new Date(dateEnd)" @change="dateEndChange"></calendar>
        <select-company v-model="companyObj" ref="pickerCompany"></select-company>

    </div>
</template>

<script>
import selectCompany from "../salesOrder/selectCompany";
export default {
  name: "accountQuerySearch",
  data() {
    let date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate()
    return {
      companyObj: {
        CompanyID: "",
        CompanyName: ""
      },
      dateBeginShow: false, // show
      dateBegin: year + "-" + month + "-01", // 选上显示值
      dateEndShow: false, // show
      dateEnd: year + "-" + month + "-" + day,
      account: JSON.parse(this.$getCookie("account")),
      user: JSON.parse(this.$getCookie("user")),
      userObj: {
        EmpID: JSON.parse(this.$getCookie("account")).EmpID,
        CNEmpName: JSON.parse(this.$getCookie("account")).CNEmpName
      }
    };
  },
  created() {
    this.getCompanyData(); // 取默认第一个显示
  },
  methods: {
    // 取默认第一个显示
    getCompanyData() {
      this.$http
        .get("/api/GetDefaultCompany", {
          params: { fid: this.account.fid, empId: this.user.username }
        })
        .then(
          res => {
            // this.$http.get('/api/GetDefaultCompany', { params: {fid: this.account.fid, empId:'admin'} }).then(res => {
            if (res.data.status.toString() === this.GLOBAL.status) {
              let list = res.data.DataList;
              // console.log(list)
              if (list.length > 0) {
                this.companyObj = list[0];
              } else {
                this.$toast("未查到业务员公司抬头");
              }
            } else {
              this.$messageBox(res.data.message);
            }
          },
          res => {}
        );
    },
    dateBeginChange(val) {
      log(val);
      this.dateBegin = this.$moment(val).format("YYYY-MM-DD");
    },
    dateEndChange(val) {
      log(val);
      this.dateEnd = this.$moment(val).format("YYYY-MM-DD");
    },
    submit() {
      let data = {
        beginCreateDate: this.dateBegin,
        endCreateDate: this.dateEnd,
        companyID: this.companyObj.CompanyID
      };
      let url = "/home/accountQuery/list/" + JSON.stringify(data);
      this.$router.push(url);
    }
  },
  components: {
    "select-company": selectCompany
  }
};
</script>

<style lang="less" scoped>
.accountSearch {
  // height: 100%;
  section {
    // border: 1px solid red;
    background-color: #f7f8f9;
    overflow: auto;
    position: absolute;
    left: 0;
    top: 40px;
    right: 0;
    bottom: 62px;
    padding-bottom: 30px;
    -webkit-overflow-scrolling: touch;
    > h2 {
      padding: 11px 0;
      .iconfont {
        font-size: 14px;
      }
    }
  }
}
</style>