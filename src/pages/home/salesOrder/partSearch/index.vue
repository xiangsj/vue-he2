<template>
    <div class="partSearch">
        <mt-header title="配件搜索">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>

        <section>
            <div class="bg-white" style="padding:10px 0">
                <mt-field class="inputRight" label="编号" placeholder="请输入主机编号/厂家供货编号" v-model="no"></mt-field>
                <mt-field class="inputRight" label="配件名称" placeholder="请输入配件名称" v-model="no"></mt-field>

                <div @click="$refs.pickerPartsBrand.open()">
                    <mt-cell title="配件品牌" is-link value="请选择配件品牌">
                        <span v-if="search.partsBrandObj.Brand != ''">{{search.partsBrandObj.Brand}}</span>
                    </mt-cell>
                </div>

                <div @click="$refs.pickerCarBrand.open()">
                    <mt-cell title="汽车品牌" is-link value="请选择汽车品牌">
                        <span v-if="search.carBrandObj.BrandName != ''">{{search.carBrandObj.BrandName}}</span>
                    </mt-cell>
                </div>

            </div>
        </section>

        <footer class="btnFooter btnNum2">
            <mt-button type="primary" @click="submit()">查询</mt-button>
            <mt-button @click="clear()">清空</mt-button>
        </footer>

        <!-- 选配件品牌 -->
        <select-parts-brand v-model="search.partsBrandObj" ref="pickerPartsBrand"></select-parts-brand>

        <select-car-brand v-model="search.carBrandObj" ref="pickerCarBrand"></select-car-brand>

    </div>
</template>

<script>
import selectPartsBrand from './selectPartsBrand'
import selectCarBrand from './selectCarBrand'


export default {
    name: 'partSearch',
    data() {
        return {
            no: '',
            search: {
                keywords: '',
                partsBrandObj: {
                    Brand:'',
                    BrandCode:''
                },
                carBrandObj: {
                    BrandID: '',
                    BrandName: '',
                },
                tree: {
                    VehicleID: '',
                    VehicleName: '',
                },
                SN: {
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

        }
    },
    components: {
        'select-parts-brand': selectPartsBrand,
        'select-car-brand': selectCarBrand
    }
}
</script>

<style lang="less" scoped>
.partSearch {
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
        >h2 {
            padding: 11px 0;
            .iconfont {
                font-size: 14px;
            }
        }
    }
}
</style>