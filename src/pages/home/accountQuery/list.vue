<template>
    <div class="accountQueryList">
        <mt-header title="公司台账">
            <router-link to="/home/accountQuery/search" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <section v-infinite-scroll="loadMore" infinite-scroll-disabled="isMore" infinite-scroll-distance="10">
            <dl v-for="(item,index) in listData" :key="index">
                <dt>{{$moment(item.FCreateDate).format('YYYY-MM-DD')}}</dt>
                <dd @click="goList(item)">
                    <span class="name">销售单数</span>
                    <span class="value" style="color:#008cee">{{item.FScCount ? parseInt(item.FScCount) : '0'}}</span>
                </dd>
                <dd @click="goList(item)">
                    <span class="name">销售数量</span>
                    <span class="value" style="color:#008cee">{{item.FSaleQty ? parseInt(item.FSaleQty) : '0'}}</span>
                </dd>
                <dd @click="goList(item)">
                    <span class="name">销售金额</span>
                    <span class="value" style="color:#008cee">{{item.FSaleAmt ? Number(item.FSaleAmt).toFixed(2) : '0.00'}}</span>
                </dd>

                <dd>
                    <span class="name">出库单数</span>
                    <span class="value">{{item.FWHOutCount ? parseInt(item.FWHOutCount) : '0'}}</span>
                </dd>
                <dd>
                    <span class="name">出库数量</span>
                    <span class="value">{{item.FWHOutQty ? parseInt(item.FWHOutQty) : '0'}}</span>
                </dd>
                <dd>
                    <span class="name">出库金额</span>
                    <span class="value">{{item.FWHOutAmt ? Number(item.FWHOutAmt).toFixed(2) : '0.00'}}</span>
                </dd>

                <dd>
                    <span class="name">入库单数</span>
                    <span class="value">{{item.FWHInCount ? parseInt(item.FWHInCount) : '0'}}</span>
                </dd>
                <dd>
                    <span class="name">入库数量</span>
                    <span class="value">{{item.FWHIntQty ? parseInt(item.FWHIntQty) : '0'}}</span>
                </dd>
                <dd>
                    <span class="name">入库金额</span>
                    <span class="value">{{item.FWHIntAmt ? Number(item.FWHIntAmt).toFixed(2) : '0.00'}}</span>
                </dd>


                <dd>
                    <span class="name">实收金额</span>
                    <span class="value">{{item.FRecAmt ? Number(item.FRecAmt).toFixed(2) : '0.00'}}</span>
                </dd>
                <dd>
                    <span class="name">实付金额</span>
                    <span class="value">{{item.FSedAmt ? Number(item.FSedAmt).toFixed(2) : '0.00'}}</span>
                </dd>
                <dd>
                    <span class="name">预估销售运费</span>
                    <span class="value">{{item.FDFAmt ? Number(item.FDFAmt).toFixed(2) : '0.00'}}</span>
                </dd>
                <dd>
                    <span class="name">实付销售运费</span>
                    <span class="value">{{item.FFactFreightAmt1 ? Number(item.FFactFreightAmt1).toFixed(2) : '0.00'}}</span>
                </dd>
                <dd>
                    <span class="name">预估采购运费</span>
                    <span class="value">{{item.FWHDFAmt ? Number(item.FWHDFAmt).toFixed(2) : '0.00'}}</span>
                </dd>
                <dd>
                    <span class="name">实付采购运费</span>
                    <span class="value">{{item.FFactFreightAmt2 ? Number(item.FFactFreightAmt2).toFixed(2) : '0.00'}}</span>
                </dd>
                <dd>
                    <span class="name">报销金额</span>
                    <span class="value">{{item.FCostAmt ? Number(item.FCostAmt).toFixed(2) : '0.00'}}</span>
                </dd>
                <dd>
                    <span class="name">预估毛利</span>
                    <span class="value">{{item.FProfitAmt ? Number(item.FProfitAmt).toFixed(2) : '0.00'}}</span>
                </dd>
                
            </dl>
            <div class="getMore text-center">
                <span v-if="loading"><i class="iconfont icon-loading"></i>努力加载中...</span>
                <span v-else>没有更多了</span>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: "accountQueryList",
  data() {
    return {
      isMore: true, //false 为开启加载更多
      loading: false,
      obj: {},
      pageIndex: 1,
      pageSize: 10,
      listData: [],
      account: JSON.parse(this.$getCookie("account")),
      user: JSON.parse(this.$getCookie("user")),
      userObj: {
        EmpID: JSON.parse(this.$getCookie("account")).EmpID,
        CNEmpName: JSON.parse(this.$getCookie("account")).CNEmpName
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    goList(item) {
      // console.log(item)
      // companyID: this.obj.companyID,
      var subStr = new RegExp("/", "g"); //创建正则表达式对象
      let data = {
        fCreateDate: this.$moment(item.FCreateDate).format("YYYY-MM-DD"),
        companyID: this.obj.companyID
      };
      log(data);
      // return
      let url = "/home/orderSearchList/" + JSON.stringify(data);
      this.$router.push(url);
      // this.$messageBox('请稍等!!!')
    },
    loadMore() {
      console.log("iii");
      return;
      this.loading = true;
      this.pageIndex++;
      let data = {
        fid: this.account.fid,
        WHID: this.obj.WHID,
        itemNo: this.obj.itemNo,
        itemCName: this.obj.itemCName,
        brand: this.obj.brand,
        brandID: this.obj.brandID,
        vehicleID: this.obj.vehicleID,
        styleID: this.obj.styleID,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      // console.log(data)
      this.$http.get("/api/StockSearch", { params: data }).then(
        res => {
          if (res.data.status.toString() === this.GLOBAL.status) {
            this.loading = false;
            let data = res.data.DataList;
            // console.log(data)
            if (data.length === 0) {
              this.isMore = true;
              // this.pageIndex = 1
              return;
            }
            this.listData = this.listData.concat(data);
          } else {
            this.$messageBox(res.data.message);
          }
        },
        res => {}
      );
    },
    getData() {
      let obj = {};
      try {
        obj = JSON.parse(this.$route.params.string);
        this.obj = obj;
        // console.log(obj)
      } catch (e) {
        // console.log("nnn")
        this.$messageBox.alert("参数有误，返回重新查询").then(action => {
          this.$router.push("/login");
        });
        return;
      }
      let data = {
        fid: this.account.fid,
        empID: this.userObj.EmpID,
        companyID: this.obj.companyID,
        beginDate: this.obj.beginCreateDate,
        endDate: this.obj.endCreateDate
      };
      console.log(data);
      this.loading = true;
      this.$http.get("/api/GetCompanyDateReport", { params: data }).then(
        res => {
          if (res.data.status.toString() === this.GLOBAL.status) {
            this.loading = false;
            let list = res.data.DataList;
            console.log(list);
            if (list.length === 0) {
              this.$messageBox
                .alert("没有查到数据，返回重新查询")
                .then(action => {
                  this.$router.go(-1);
                });
              return;
            }
            if (list.length >= this.pageSize) {
              // 多于当前条数，接着再查
              this.isMore = false;
            }
            this.listData = list;
          } else {
            this.$messageBox(res.data.message);
          }
        },
        res => {}
      );
    }
  }
};
</script>

<style lang="less" scoped>
.accountQueryList {
  // border: 1px solid blue;
  height: 100%;
  position: relative;
  section {
    position: absolute;
    left: 0;
    top: 40px;
    right: 0;
    bottom: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    > dl {
      // background: red;
      margin: 0;
      border-bottom: 1px solid #eee;
      // padding: 8px 15px 8px 15px;
      color: #606266;
      position: relative;
      > dt {
        // color: #008cee;
        background: #f7f8f9;
        padding: 13px 15px 6px;
      }
      > dd {
        // background: red;
        border-bottom: 1px solid #f7f8f9;
        padding: 8px 15px;
        margin: 0;
        > span.value {
          float: right;
        }
      }
      .iconfont {
        position: absolute;
        width: 30px;
        height: 30px;
        line-height: 30px;
        top: 50%;
        margin-top: -15px;
        right: 0;
        color: #909399;
      }
      &:active {
        background: #f7f8f9;
      }
    }
  }
}
</style>
