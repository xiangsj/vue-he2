<template>
    <div class="selectCustClassify popupSelect">
        <mt-popup v-model="popupVisible" position="right" class="modelRight">
            <mt-header title="选择单位分类">
                <router-link to="" slot="left">
                    <mt-button icon="back" @click="popupVisible = false">返回</mt-button>
                </router-link>
            </mt-header>
            <section v-infinite-scroll="loadMore" infinite-scroll-disabled="isMore" infinite-scroll-distance="10">
                <ul class="dataList">
                    <li v-for="(item,index) in popupArr" :key="index" @click="currentObj = item" :class="[currentObj.FID == item.FID ? 'active' : '']">
                        {{item.SortName}}
                        <span class="icon" v-if="currentObj.FID == item.FID"><i class="iconfont icon-hook"></i></span>
                    </li>
                </ul>
                <div class="getMore text-center">
                    <span v-if="loading"><i class="iconfont icon-loading"></i>努力加载中...</span>
                    <span v-else>没有更多了</span>
                </div>
            </section>
            <div class="buttonFoot">
                <mt-button size="large" type="primary" @click="surePopup()">确定</mt-button>
            </div>
        </mt-popup>
    </div>
</template>

<script>
export default {
  name: "selectCustClassify",
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
      account: JSON.parse(this.$getCookie("account")),
      popupArr: [],
      currentObj: this.msg // 当前选中项
    };
  },
  created() {
    // console.log(this.currentObj)
  },
  methods: {
    loadMore() {
      // console.log("more")
    },
    open(id) {
      if (!id) {
        this.$toast("请先选择单位属性");
        return;
      }
      this.popupVisible = true;
      this.$http
        .get("/api/GetCustSort", {
          params: { fid: this.account.fid, ctype: id }
        })
        .then(
          res => {
            if (res.data.status.toString() === this.GLOBAL.status) {
              let list = res.data.DataList;
            //   console.log(list);
              this.popupArr = list;
            } else {
              this.$messageBox(res.data.message);
            }
          },
          res => {}
        );
    },
    surePopup() {
      this.popupVisible = false;
      this.popupArr = []; // 清空搜索
      this.$emit("ee", this.currentObj);
    }
  }
};
</script>
