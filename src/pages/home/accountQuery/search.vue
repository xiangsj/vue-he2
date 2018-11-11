<template>
    <div class="stockSearch">
        <mt-header title="库存查询">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>

        <section>
            <div>
                <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
            </div>
        </section>

        <footer class="btnFooter btnNum2">
            <mt-button type="primary" @click="submit()">查询</mt-button>
            <mt-button @click="clear()">清空</mt-button>
        </footer>

    </div>
</template>

<script>
import selectStock from './selectStock'

import selectPartsBrand from '../salesOrder/partSearch/selectPartsBrand'
import selectCarBrand from '../salesOrder/partSearch/selectCarBrand'
import selectCarSeries from '../salesOrder/partSearch/selectCarSeries'
import selectCarStyle from '../salesOrder/partSearch/selectCarStyle'

export default {
    name: 'stockSearch',
    data() {
        return {
            search: {
                no: '',
                partName: '',
                stockObj: {
                    WHID: '',
                    WHName:''
                },
                partsBrandObj: {
                    Brand: '',
                    BrandCode: ''
                },
                carBrandObj: {
                    BrandID: '',
                    BrandName: '',
                },
                carSeriesObj: {
                    VehicleID: '',
                    VehicleName: '',
                },
                carStyleObj: {
                    StyleID: '',
                    StyleName: '',
                }
            },

            slots: [
        {
          flex: 1,
          values: ['aaa-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'center'
        }, {
          flex: 1,
          values: ['bbb-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'center'
        }, {
          flex: 1,
          values: ['ccc-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'center'
        }
      ]
        }
    },
    created() {
    },
    methods: {
        onValuesChange(picker, values) {
            console.log(picker)
            console.log(values)
            this.slots[1].values = ['eee1', 'eee2']
                // picker.setSlotValue(1, 'llkkjj');
            // if (values[0] > values[1]) {
            //     picker.setSlotValue(1, 'iuu');
            // }
        },
        updataBrandSN(item) {
            this.search.SN = item;
        },
        updataBrandTree(item) {
            this.search.tree = item;
            this.search.SN = {
                StyleID: '',
                StyleName: ''
            }
        },
        updataBrand(item) {
            this.search.brand = item;
            this.search.tree = {
                VehicleID: '',
                VehicleName: '',
            }
            this.search.SN = {
                StyleID: '',
                StyleName: ''
            }
        },
        submit() {
            let data = {
                WHID: this.search.stockObj.WHID,
                itemNo: this.search.no,
                itemCName: this.search.partName,
                brand: this.search.partsBrandObj.Brand,
                brandID: this.search.carBrandObj.BrandID,
                vehicleID: this.search.carSeriesObj.VehicleID,
                styleID: this.search.carStyleObj.StyleID
            }
            let url = './list/' + JSON.stringify(data)
            this.$router.push(url)
        },
        clear() {
            this.$toast('已清空')
            this.search = {
                no: '',
                partName: '',
                stockObj: {
                    WHID: '',
                    WHName:''
                },
                partsBrandObj: {
                    Brand: '',
                    BrandCode: ''
                },
                carBrandObj: {
                    BrandID: '',
                    BrandName: '',
                },
                carSeriesObj: {
                    VehicleID: '',
                    VehicleName: '',
                },
                carStyleObj: {
                    StyleID: '',
                    StyleName: '',
                }
            }
        }
    },
    components: {
        'select-stock': selectStock,

        'select-parts-brand': selectPartsBrand,
        'select-car-brand': selectCarBrand,
        'select-car-series': selectCarSeries,
        'select-car-style': selectCarStyle
    }
}
</script>

<style lang="less" scoped>
.stockSearch {
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
        >h2 {
            padding: 11px 0;
            .iconfont {
                font-size: 14px;
            }
        }
    }
}
</style>