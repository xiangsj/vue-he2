<template>
    <div class="addCompany">
        <mt-header title="创建往来单位">
            <router-link to="/home/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>

        <section>
            <div class="bg-white">
                <mt-field class="required inputRight" @blur.native.capture="getCustNum" label="单位名称" placeholder="请输入单位名称" v-model="form.customerName"></mt-field>
                <mt-field class="inputRight" label="检索号" placeholder="请输入检索号" v-model="form.custNum"></mt-field>
                <div @click="$refs.pickerCustType.open()">
                    <mt-cell class="required" title="单位属性" is-link value="请选择单位属性">
                        <span class="value" v-if="form.custTypeObj.ValueName !== ''">{{form.custTypeObj.ValueName}}</span>
                    </mt-cell>
                </div>

                <div @click="$refs.pickerCustClassify.open(form.custTypeObj.ValueID)">
                    <mt-cell class="" title="单位分类" is-link value="请选择单位分类">
                        <span class="value" v-if="form.custClassifyObj.SortName !== ''">{{form.custClassifyObj.SortName}}</span>
                    </mt-cell>
                </div>
                <mt-field class="inputRight" label="单位别名" placeholder="请输入单位别名" v-model="form.FullName"></mt-field>
                <div @click="$refs.pickerCity.open()">
                    <mt-cell class="" title="所在城市" is-link value="请选择所在城市">
                        <span class="value" v-if="form.city.name !== ''">{{form.city.name}}</span>
                    </mt-cell>
                </div>
                <mt-field class="inputRight" label="单位电话" placeholder="请输入单位电话" v-model="form.Tel"></mt-field>
                <mt-field class="inputRight" label="微信" placeholder="请输入微信" v-model="form.WeChat"></mt-field>
                <mt-field class="inputRight" label="单位Email" placeholder="请输入单位Email" v-model="form.CarOwnerEmail"></mt-field>
                <mt-field class="inputRight" label="单位详细地址" placeholder="请输入单位详细地址" v-model="form.Addr"></mt-field>
                <mt-field class="inputRight" label="备注" placeholder="请输入备注" v-model="form.Memo"></mt-field>

            </div>
            <h2 class="text-center">
                <mt-button @click="$refs.addContacts.open()" size="small" type="primary" plain>添加联系人
                    <i class="iconfont icon-add-empty"></i>
                </mt-button>
            </h2>

            <div class="bg-white partsList">
                <dl v-for="(item,index) in contactsAddList" :key="index">
                    <div class="btns">
                        <span @click="removeThis(index)">
                            <i class="iconfont icon-remove"></i>
                        </span>
                        <span @click="$refs.addContacts.editThis(index, item)">
                            <i class="iconfont icon-edit"></i>
                        </span>
                    </div>
                    <dd style="margin-left:0; line-height:26px;">
                        <div>
                            {{item.FullName}}
                            {{item.Departement}}
                            {{item.Jobs}}
                            {{item.Mobile}}
                            <span v-if="item.MainContact == 1" style="color:#008cee;">主联系人</span>
                        </div>
                        <div>
                            {{item.Address}}
                        </div>
                    </dd>
                </dl>
            </div>

        </section>

        <footer class="btnFooter">
            <mt-button type="primary" @click="submit()">保存</mt-button>
        </footer>

        <select-cust-type v-model="form.custTypeObj" ref="pickerCustType" @ee="resetClassigyObj"></select-cust-type>
        <select-cust-classify v-model="form.custClassifyObj" ref="pickerCustClassify"></select-cust-classify>
        <select-city v-model="form.city" ref="pickerCity"></select-city>
        <add-contacts ref="addContacts" @changeAdd="changeAdd"></add-contacts>
        
    </div>
</template>

<script>
import selectCustType from "./selectCustType";
import selectCustClassify from "./selectCustClassify";
import selectCity from "./selectCity";
import addContacts from "./addContacts";
export default {
  name: "addCompany",
  data() {
    return {
      form: {
        customerName: "",
        custNum: "",
        custTypeObj: {
          ValueID: "",
          ValueName: ""
        },
        custClassifyObj: {
          FID: "",
          SortName: ""
        },
        FullName: "",
        city: {
          FID: "",
          name: ""
        },
        Tel: "",
        WeChat: "",
        CarOwnerEmail: "",
        Addr: "",
        Memo: ""
      },
      companyName: "",
      account: JSON.parse(this.$getCookie("account")),
      user: JSON.parse(this.$getCookie("user")),
      userObj: {
        EmpID: JSON.parse(this.$getCookie("account")).EmpID,
        CNEmpName: JSON.parse(this.$getCookie("account")).CNEmpName
      },

      contactsAddList: [] // 添加的联系人列表
    };
  },
  created() {},
  methods: {
    removeThis(index) {
      this.$messageBox
        .confirm("确定移除这个联系人吗?", "")
        .then(action => {
          this.contactsAddList.splice(index, 1);
          this.$toast("移除成功");
        })
        .catch(() => {});
    },
    changeAdd(data, index) {
      if (index === null) {
        // 新增时：
        this.contactsAddList.push(data);
      } else {
        // 编辑时：
        let newArr = this.contactsAddList.concat();
        newArr[index] = data;
        this.contactsAddList = newArr;
      }
    },
    resetClassigyObj() {
      this.form.custClassifyObj = {
        FID: "",
        SortName: ""
      };
    },
    // 以单件名称，取客户检索号
    getCustNum() {
      if (this.form.customerName == "") {
        return;
      }
      this.$http
        .get("/api/GetCustIndex", {
          params: { fid: this.account.fid, briefName: this.form.customerName }
        })
        .then(
          res => {
            if (res.data.status.toString() === this.GLOBAL.status) {
              let DataList = res.data.DataList;
              // console.log(DataList)
              if (DataList.length > 0 && DataList[0]) {
                this.form.custNum = DataList[0];
                this.$toast("已查到检索号");
              } else {
                this.$toast("未查到该单位检索号，请手动输入");
              }
            } else {
              this.$messageBox(res.data.message);
            }
          },
          res => {}
        );
    },
    async submit() {
      if (this.form.customerName == "") {
        this.$toast("请输入单位名称");
        return;
      }
      //   检查重复
      let checkRepeatRes = await this.$http.get("/api/SaveSelectCustomer", {
        params: { fid: this.account.fid, briefName: this.form.customerName }
      });
      //   log(checkRepeatRes.data);
      if (checkRepeatRes.data.status.toString() !== this.GLOBAL.status) {
        this.$messageBox(res.data.message);
        return;
      }
      if (checkRepeatRes.data.DataList == 1) {
        this.$toast("单位名称重复，请确认！");
        return;
      }
      if (this.form.custTypeObj.ValueID == "") {
        this.$toast("请选择单位属性");
        return;
      }
      if (this.contactsAddList.length === 0) {
        this.$toast("请添加联系人");
        return;
      }

      let Head = {
        BriefName: this.form.customerName,
        FullName: this.form.FullName,
        CustIndex: this.form.custNum,
        CType: this.form.custTypeObj.ValueID,
        CustSort: this.form.custClassifyObj.FID,
        SalesArea: this.form.city.FID,
        Tel: this.form.Tel,
        WeChat: this.form.WeChat,
        CarOwnerEmail: this.form.CarOwnerEmail,
        Addr: this.form.Addr,
        Memo: this.form.Memo
      };

      let jsondata = {
        fid: this.account.fid,
        dataList: {
          Head: Head,
          Detail: this.contactsAddList
        },
        empId: this.user.username
      };
      // log(jsondata);
      this.$indicator.open();
      //   return;
      this.$http.post("/api/SaveAddCustomer", jsondata).then(
        res => {
          this.$indicator.close();
          if (res.data.status.toString() === this.GLOBAL.status) {
            log(res.data);
            this.$toast("创建成功!");
            setTimeout(() => {
              this.$router.push("/home/main");
            }, 3000);
          } else {
            this.$messageBox(res.data.message);
          }
        },
        res => {}
      );
    }
  },
  components: {
    "select-cust-type": selectCustType,
    "select-cust-classify": selectCustClassify,
    "select-city": selectCity,
    "add-contacts": addContacts
  },
  watch: {
    $route(to, from) {
      // log('from.name')
      // log(from.name)
    }
  }
};
</script>

<style lang="less" scoped>
.addCompany {
  // height: 100%;
  section {
    // border: 1px solid red;
    background-color: #f7f8f9;
    overflow: auto;
    position: absolute;
    left: 0;
    top: 40px;
    right: 0;
    bottom: 60px;
    padding-bottom: 30px;
    -webkit-overflow-scrolling: touch;
    > h2 {
      padding: 11px 0;
      .iconfont {
        font-size: 14px;
      }
    }
    .partsList {
      > dl {
        background: #fff;
        padding: 8px 50px 8px 15px;
        position: relative;
        min-height: 58px;
        border-bottom: 1px solid #eee;
        .btns {
          // border:1px solid red;
          position: absolute;
          top: 3px;
          right: 10px;
          bottom: 3px;
          > span {
            // border:1px solid blue;
            display: block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin: 3px 0;
            border-radius: 50%;
            i {
              font-size: 23px;
            }
            .icon-remove {
              color: red;
            }
            .icon-edit {
              color: #008cee;
            }
            &:active {
              background: #ddd;
            }
          }
        }
        > dt {
          // background: #eee;
          width: 55px;
          height: 55px;
          line-height: 55px;
          text-align: center;
          position: absolute;
          left: 15px;
          top: 50%;
          margin-top: -27px;
          i {
            font-size: 46px;
            color: #909399;
          }
        }
        > dd {
          margin-left: 66px;
          padding-top: 6px;
          line-height: 22px;
          > div {
            clear: both;
          }
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>