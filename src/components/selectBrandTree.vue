<template>
  <div class="selectBrand" v-if="isOpen">

    <mt-header :title="'选择车系（' + BrandName + '）'">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="isOpen=false">返回</mt-button>
      </router-link>
    </mt-header>

    <mt-index-list>
      <mt-index-section v-for="(item,index) in navs" :key="index" :index="item.initials">
        <div v-for="(item2,index2) in item.list" :key="index2" @click="sendBrand(item2)">
          <mt-cell :title="item2.VehicleName"></mt-cell>
        </div>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';

export default {
  name: 'selectBrand',
  data() {
    return {
      isOpen: false,
      navs: [],
      BrandName: '',
    }
  },
  created() {

  },
  methods: {
    sendBrand(item) {
      this.isOpen = false;
      this.$emit("updata", item)
      // console.log(item.BrandID)
    },
    open(item) {
      Indicator.open();
      this.isOpen = true;
      this.getData(item);
      this.BrandName = item.BrandName;
    },
    getData(item) {
      if (!item.BrandID) { return; }
      this.$http.get('/api/Vehicle', { params: { brandID: item.BrandID } }).then(res => {
        // console.log(res)
        let dataList = res.DataList;
        if (dataList.length === 0) {
          MessageBox.alert('抱歉！没有查到数据').then(action => {
            this.close();
          });
          return;
        }
        let conArr = [];
        dataList.forEach(item => {
          if (conArr.indexOf(item.FirstChar) === -1) {
            conArr.push(item.FirstChar);
          }
        });
        // console.log(conArr)

        let newData = [];
        conArr.forEach(item => {
          let list = [];
          dataList.forEach(item2 => {
            if (item == item2.FirstChar) {
              list.push(item2);
            }
          })
          newData.push({
            initials: item,
            list: list
          });
        })
        // console.log(newData)
        this.navs = newData;

        Indicator.close();
      }, res => {
        // error callback
      });
    }

  }
}
</script>

<style lang="less">

</style>
