<template>
    <mt-popup v-model="popupVisible" position="bottom" style="width:100%;">
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
    //   popupVisible: false,
      popupVisible: true,
      currentObj: this.msg, // 当前选中项
      account: JSON.parse(this.$getCookie("account")),
      slots: [
        {
          flex: 1,
          values: [
            "aaa-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ],
          className: "slot1",
          textAlign: "center"
        },
        {
          flex: 1,
          values: [
            "bbb-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ],
          className: "slot3",
          textAlign: "center"
        },
        {
          flex: 1,
          values: [
            "ccc-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ],
          className: "slot3",
          textAlign: "center"
        }
      ],
      pickArr: [],
      provinceDataArr: [],
      cityDataArr: [],
    };
  },
  created() {
    // console.log(this.currentObj)

  },
  methods: {
    onValuesChange(picker, values) {
        this.pickArr = values
    //   console.log(picker);
      console.log(values);
      this.slots[1].values = ["eee1", "eee2"];
      // picker.setSlotValue(1, 'llkkjj');
      // if (values[0] > values[1]) {
      //     picker.setSlotValue(1, 'iuu');
      // }
    //   console.log('cc')
      this.getData()
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
        console.log(this.provinceDataArr)
        console.log(this.pickArr)

        // 以省ID 取市
        let provinceArr = this.provinceDataArr.filter(item => {
            return item.CityName == this.pickArr[0]
        })
        console.log(provinceArr)
        // console.log(provinceObj[0].FID)

        
        if (provinceArr.length === 0) { return }

        let cityData = await this.$http.get("/api/GetCustChinaCity", {
            params: { fid: this.account.fid, provinceId: provinceArr[0].FID }
        })
        this.cityDataArr = cityData.data.DataList
        let CityName2 = this.cityDataArr.map(item => {
            return item.CityName
        })
        // this.slots[1].values = CityName2

        console.log(this.cityDataArr)
        console.log(CityName2)
    },
    open() {
      this.popupVisible = true;
    }
  }
};
</script>
