<template>
    <div class="addContacts popupSelect">
        <mt-popup v-model="popupVisible" position="right" class="modelRight">
            <mt-header title="添加联系人">
                <router-link to="" slot="left">
                    <mt-button icon="back" @click="popupVisible = false">返回</mt-button>
                </router-link>
            </mt-header>
            <section>
                <mt-field class="required inputRight" label="联系人名称" placeholder="请输入联系人名称" v-model="form.FullName"></mt-field>
                <mt-field class="inputRight" label="所属门店" placeholder="请输入联系人所属门店" v-model="form.Departement"></mt-field>
                <mt-field class="inputRight" label="性别">
                    <mt-radio class="radioLine" align="left" v-model="form.Sex" :options="sexOption"></mt-radio>
                </mt-field>
                <mt-field class="inputRight" label="是否主联系人">
                    <span class="switchLabel">{{form.MainContact ? '是' : '否'}}</span>
                    <mt-switch class="pull-right" v-model="form.MainContact"></mt-switch>
                </mt-field>
                <mt-field class="inputRight" label="联系人职位" placeholder="请输入联系人职位" v-model="form.Jobs"></mt-field>
                <mt-field class="inputRight" label="联系人地址" placeholder="请输入联系人地址" v-model="form.Address"></mt-field>
                <mt-field class="inputRight" label="联系人手机" placeholder="请输入联系人手机" v-model="form.Mobile"></mt-field>
                <mt-field class="inputRight" label="联系人电话" placeholder="请输入联系人电话" v-model="form.Tel"></mt-field>
                <mt-field class="inputRight" label="备注" placeholder="请输入备注" v-model="form.Memo"></mt-field>

            </section>
            <div class="buttonFoot">
                <mt-button size="large" type="primary" @click="surePopup()">确定</mt-button>
            </div>
        </mt-popup>
    </div>
</template>

<script>
export default {
  name: "addContacts",
  model: {
    prop: "msg",
    event: "ee"
  },
  props: {
    msg: {}
  },
  data() {
    return {
      isMore: true, //false 为开启加载更多
      loading: false,
      popupVisible: false,
      // popupVisible: true,
      currentObj: this.msg, // 当前选中项
      form: {
        FullName: "",
        Departement: "",
        Sex: "1",
        MainContact: false,
        Jobs: "",
        Address: "",
        Mobile: "",
        Tel: "",
        Memo: ""
      },
      sexOption: [
        {
          label: "男",
          value: "1"
        },
        {
          label: "女",
          value: "0"
        }
      ],
      index: null
    };
  },
  created() {
    // console.log(this.currentObj)
  },
  methods: {
    loadMore() {
      // console.log("more")
    },
    editThis(index, item) {
      this.index = index;
      log(this.index);
      let data = Object.assign({}, item);
      data.Sex = data.Sex + "";
      data.MainContact = !!data.MainContact;
      this.form = data;
      this.popupVisible = true;
    },
    open() {
      this.popupVisible = true;
    },
    surePopup() {
      //
      if (this.form.FullName == "") {
        this.$toast("请输入联系人名称");
        return;
      }
      let data = Object.assign({}, this.form);
      data.Sex = Number(data.Sex);
      data.MainContact = Number(data.MainContact);
      this.popupVisible = false;
      // log(this.index)
      this.$emit("changeAdd", data, this.index);
      this.clear(); // 清零
      // if (this.msg !== this.currentObj) {
      //   this.$emit("ee", this.currentObj);
      // }
    },
    clear() {
      this.index = null;
      this.form = {
        FullName: "",
        Departement: "",
        Sex: "1",
        MainContact: false,
        Jobs: "",
        Address: "",
        Mobile: "",
        Tel: "",
        Memo: ""
      };
    }
  }
};
</script>
