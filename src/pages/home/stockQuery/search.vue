<template>
    <div class="stockSearch">
        <mt-header title="库存查询">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>

        <section>
            <div class="bg-white">
                <div @click="$refs.pickerStock.open()">
                    <mt-cell title="选择仓库" is-link value="请选择仓库">
                        <span class="value" v-if="search.stockObj.WHName != ''">{{search.stockObj.WHName}}</span>
                    </mt-cell>
                </div>

                <mt-field class="inputRight" label="编号" placeholder="请输入主机编号/厂家供货编号" v-model="search.no"></mt-field>

                <mt-field class="inputRight" label="配件名称" placeholder="请输入配件名称" v-model="search.partName"></mt-field>

                <div @click="$refs.pickerPartsBrand.open()">
                    <mt-cell title="配件品牌" is-link value="请选择配件品牌">
                        <span class="value" v-if="search.partsBrandObj.Brand != ''">{{search.partsBrandObj.Brand}}</span>
                    </mt-cell>
                </div>
<!-- <div style="height:888px">jj</div> -->
                <div @click="$refs.pickerCarBrand.open()">
                    <mt-cell title="汽车品牌" is-link value="请选择汽车品牌">
                        <span class="value" v-if="search.carBrandObj.BrandName != ''">{{search.carBrandObj.BrandName}}</span>
                    </mt-cell>
                </div>

                <div @click="$refs.pickerCarSeries.open(search.carBrandObj.BrandID)">
                    <mt-cell title="汽车车系" is-link value="请选择汽车车系">
                        <span class="value" v-if="search.carSeriesObj.VehicleName != ''">{{search.carSeriesObj.VehicleName}}</span>
                    </mt-cell>
                </div>
                <div @click="$refs.pickerCarStyle.open(search.carSeriesObj.VehicleID)">
                    <mt-cell title="汽车车型" is-link value="请选择汽车车型">
                        <span class="value" v-if="search.carStyleObj.StyleName != ''">{{search.carStyleObj.StyleName}}</span>
                    </mt-cell>
                </div>

            </div>
        </section>

        <footer class="btnFooter btnNum2">
            <mt-button type="primary" @click="submit()">查询</mt-button>
            <mt-button @click="clear()">清空</mt-button>
        </footer>

        <!-- 仓库选择 -->
        <select-stock v-model="search.stockObj" ref="pickerStock"></select-stock>

        <!-- 配件品牌 -->
        <select-parts-brand v-model="search.partsBrandObj" ref="pickerPartsBrand"></select-parts-brand>

        <select-car-brand v-model="search.carBrandObj" ref="pickerCarBrand"></select-car-brand>

        <select-car-series v-model="search.carSeriesObj" ref="pickerCarSeries"></select-car-series>

        <select-car-style v-model="search.carStyleObj" ref="pickerCarStyle"></select-car-style>

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
        }
    },
    created() {
    },
    methods: {
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