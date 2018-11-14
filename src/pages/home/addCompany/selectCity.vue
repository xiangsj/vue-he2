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
      pickArr: [undefined, undefined, undefined],
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
        console.log(values)
        console.log(this.pickArr)
        if (!values[0]) { return }
        this.pickArr = [].concat(values)
        // this.pickArr = values
    },
    async getData() {
        let provinceData = await this.$http.get("/api/GetCustChinaProvince", {
            params: { fid: this.account.fid }
        })
        this.provinceDataArr = provinceData.data.DataList
        this.slots[0].values = this.provinceDataArr.map(item => {
            return item.CityName
        })
        setTimeout(() => {
            this.getCity() // 以省ID 取市
        }, 50)
    },
    async getCity() {
        console.log(' jjj')
        console.log(this.pickArr)
        console.log(' jjj')
      let provinceArr = this.provinceDataArr.filter(item => {
          return item.CityName == this.pickArr[0]
      })
      if (provinceArr.length === 0 || !provinceArr[0].FID) { return }

        let cityData = await this.$http.get("/api/GetCustChinaCity", {
            params: { fid: this.account.fid, provinceId: provinceArr[0].FID }
        })
        this.cityDataArr = cityData.data.DataList
        this.slots[1].values = this.cityDataArr.map(item => {
            return item.CityName
        })
        // console.log(' iii ')
        setTimeout(() => {
            this.getTown()
        }, 50)
    },
    async getTown() {
        let cityArr = this.cityDataArr.filter(item => {
            return item.CityName == this.pickArr[1]
        })
        if (cityArr.length === 0 || !cityArr[0].FID) { return }
        let cityData = await this.$http.get("/api/GetCustChinaArea", {
            params: { fid: this.account.fid, cityID: cityArr[0].FID }
        })
        this.townDataArr = cityData.data.DataList
        this.slots[2].values = this.townDataArr.map(item => {
            return item.CityName
        })
    },
    open() {
      this.popupVisible = true;
      this.getData()
    }
  },
  watch: {
      pickArr: function(newval, oldval) {
          console.log('new')
          console.log(newval)
          console.log('old')
          console.log(oldval)
          // 更新 city
          if (!newval[0] || !oldval[0]) { return }
          if (newval[0] !== oldval[0] && newval[1] === oldval[1]) {
              console.log(' ccc ')
              this.getCity()
          }
          // 更新 town
          if (!newval[1] || !oldval[1] || !newval[2]) { return }
          if (newval[0] === oldval[0] && newval[1] !== oldval[1] && newval[2] === oldval[2]) {
              console.log(' ttt ')
              this.getTown()
          }
      }
  }
};
</script>
