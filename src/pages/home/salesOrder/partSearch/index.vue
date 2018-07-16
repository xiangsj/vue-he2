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
                <mt-field class="inputRight" label="配件名称" placeholder="请输入请输入配件名称" v-model="no"></mt-field>

                <div @click="$refs.selectPartsBrand.open()">
                    <mt-cell title="配件品牌" is-link value="请选择配件品牌">
                        <span v-if="search.brand.BrandName != ''">{{search.brand.BrandName}}</span>
                    </mt-cell>
                </div>

                <div @click="$refs.selectBrand.open()">
                    <mt-cell title="汽车品牌" is-link value="请选择汽车品牌">
                        <span v-if="search.brand.BrandName != ''">{{search.brand.BrandName}}</span>
                    </mt-cell>
                </div>

                <div @click="treeClick()">
                    <mt-cell title="汽车车系" is-link value="请选择汽车车系">
                        <span v-if="search.tree.VehicleName != ''">{{search.tree.VehicleName}}</span>
                    </mt-cell>
                </div>

                <div @click="SNclick()">
                    <mt-cell title="车型" is-link value="请选择车型">
                        <span v-if="search.SN.StyleName != ''">{{search.SN.StyleName}}</span>
                    </mt-cell>
                </div>

            </div>
        </section>

        <footer class="btnFooter">
            <mt-button type="primary" @click="submit()">保存</mt-button>
        </footer>

        <!-- 选品牌 -->
        <select-parts-brand ref="selectPartsBrand" @updata="updataBrand"></select-parts-brand>
        <select-brand ref="selectBrand" @updata="updataBrand"></select-brand>

        <!-- 选品牌 -->
        <select-brand-tree ref="selectBrandTree" @updata="updataBrandTree"></select-brand-tree>

        <!-- 选车型 -->
        <select-brand-SN ref="selectBrandSN" @updata="updataBrandSN"></select-brand-SN>
    </div>
</template>

<script>
import selectPartsBrand from '@/components/selectPartsBrand'
import selectBrand from '@/components/selectBrand'
import selectBrandTree from '@/components/selectBrandTree'
import selectBrandSN from '@/components/selectBrandSN'

export default {
    name: 'partSearch',
    data() {
        return {
            no: '',
            search: {
                keywords: '',
                brand: {
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
        'select-brand': selectBrand,
        'select-brand-tree': selectBrandTree,
        'select-brand-SN': selectBrandSN
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