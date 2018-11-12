<template>
    <mt-popup v-if="popupVisible" v-model="popupVisible" position="bottom" style="width:100%;">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
</template>

<script>
export default {
  name: "selectCity",
  model: {
    prop: "msg",
    event: "ee"
  },
  props: {
    msg: {}
  },
  data() {
    return {
      loading: false,
      popupVisible: false,
    //   popupVisible: true,
      currentObj: this.msg, // 当前选中项
      account: JSON.parse(this.$getCookie("account")),
      slots__: [
        // {
        //   flex: 1,
        //   values: [
        //     "aaa-01",
        //     "2015-02",
        //     "2015-03",
        //     "2015-04",
        //     "2015-05",
        //     "2015-06"
        //   ],
        //   className: "slot1",
        //   textAlign: "center"
        // },
        // {
        //   flex: 1,
        //   values: [
        //     "bbb-01",
        //     "2015-02",
        //     "2015-03",
        //     "2015-04",
        //     "2015-05",
        //     "2015-06"
        //   ],
        //   className: "slot3",
        //   textAlign: "center"
        // },
        // {
        //   flex: 1,
        //   values: [
        //     "ccc-01",
        //     "2015-02",
        //     "2015-03",
        //     "2015-04",
        //     "2015-05",
        //     "2015-06"
        //   ],
        //   className: "slot3",
        //   textAlign: "center"
        // }
      ],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        }
      ],
      pickArr: [],
      provinceDataArr: [],
      cityDataArr: [],
      townDataArr: []
    };
  },
  created() {
    // console.log(this.currentObj)
  },
  methods: {
    onValuesChange(picker, values) {
        // console.log(picker.getSlotValue(0) + '------')
        // console.log(values[0] + ' ====== ')
        if (this.pickArr[0] != values[0]) {
          console.log(' aaaaaa ')
          this.pickArr = [].concat(values)
          this.getCity() // 
        }
        if (this.pickArr[1] != values[1]) {
          console.log(' bbbbbb ')
          this.pickArr = [].concat(values)
        }        
      console.log(this.pickArr);
      console.log(values);
    //   this.slots[1].values = ["eee1", "eee2"];
      // picker.setSlotValue(1, 'llkkjj');
      // if (values[0] > values[1]) {
      //     picker.setSlotValue(1, 'iuu');
      // }
    //   console.log('cc')
    },
    async getData() {
        // console.log('aa')
        let provinceData = await this.$http.get("/api/GetCustChinaProvince", {
            params: { fid: this.account.fid }
        })
        this.provinceDataArr = provinceData.data.DataList
        this.slots[0].values = this.provinceDataArr.map(item => {
            return item.CityName
        })
        // console.log(this.provinceDataArr)
        // console.log(this.pickArr)

        
        // let provinceArr = this.provinceDataArr.filter(item => {
        //     return item.CityName == this.pickArr[0]
        // })
        // console.log(provinceArr)
        // // console.log(provinceObj[0].FID)
        this.getCity() // 以省ID 取市
    },
    async getCity() {
      let provinceArr = this.provinceDataArr[0]
        let cityData = await this.$http.get("/api/GetCustChinaCity", {
            params: { fid: this.account.fid, provinceId: provinceArr.FID }
        })
        this.cityDataArr = cityData.data.DataList
        this.slots[1].values = this.cityDataArr.map(item => {
            return item.CityName
        })

        console.log(this.cityDataArr)
        // console.log(CityName2)

        this.getTown()
    },
    async getTown() {
      let cityArr = this.cityDataArr[0]
        let cityData = await this.$http.get("/api/GetCustChinaArea", {
            params: { fid: this.account.fid, cityID: cityArr.FID }
        })
        // this.cityDataArr = cityData.data.DataList
        // let CityName2 = this.cityDataArr.map(item => {
        //     return item.CityName
        // })
        // this.slots[1].values = CityName2

        // console.log(this.cityDataArr)
        console.log(cityData)
        console.log(cityData)
        console.log(cityData)
    },
    open() {
      this.popupVisible = true;
      this.getData()
    }
  }
};
</script>
