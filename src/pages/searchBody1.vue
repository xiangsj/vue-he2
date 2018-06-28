<template>
    <div>
        <div class="tabContent searchBody1">
            <mt-field class="inputRight" label="关键字" placeholder="请输入车型关键字直接检索" v-model="search.keywords"></mt-field>

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

            <div class="text-center">
                <mt-button size="small" type="primary" @click="submit()">搜索</mt-button>
                <mt-button size="small" @click="clear()">清除</mt-button>
            </div>
        </div>

        <!-- 选品牌 -->
        <select-brand ref="selectBrand" @updata="updataBrand"></select-brand>

        <!-- 选品牌 -->
        <select-brand-tree ref="selectBrandTree" @updata="updataBrandTree"></select-brand-tree>

        <!-- 选车型 -->
        <select-brand-SN ref="selectBrandSN" @updata="updataBrandSN"></select-brand-SN>
    </div>
</template>

<script>
import selectBrand from '../components/selectBrand'
import selectBrandTree from '../components/selectBrandTree'
import selectBrandSN from '../components/selectBrandSN'
import { Toast } from 'mint-ui';

export default {
    name: 'searchBody1',
    props: {
        mSortNo: {
            type: String,
            default: function() {
                return ''
            }
        }
    },
    data() {
        return {
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
        treeClick() {
            let brand = this.search.brand;
            if (brand.BrandID != '') {
                this.$refs.selectBrandTree.open(brand)
            } else {
                Toast('请先选择品牌');
            }
        },
        SNclick() {
            let brand = this.search.brand;
            let tree = this.search.tree;
            if (tree.VehicleID != '') {
                this.$refs.selectBrandSN.open(tree, brand);//上一级数据传过去
            } else {
                Toast('请先选择车系');
            }
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
            // console.log(this.search)
            if (this.search.keywords === '' && this.search.brand.BrandID === '') {
                Toast('请输入搜索关键字或汽车品牌');
                return;
            }
            let data = {
                keywords: this.search.keywords,
                BrandID: this.search.brand.BrandID,
                VehicleID: this.search.tree.VehicleID,
                StyleID: this.search.SN.StyleID,
                mSortNo: this.mSortNo,

                BrandName: this.search.brand.BrandName,
                VehicleName: this.search.tree.VehicleName,
                StyleName: this.search.SN.StyleName,
            }
            let url = '/home/list/' + JSON.stringify(data);
            this.$router.push(url);
        },
        clear() {
            this.search = {
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
                    StyleName: ''
                }
            }
            Toast('已清空');
        },
    },
    components: {
        'select-brand': selectBrand,
        'select-brand-tree': selectBrandTree,
        'select-brand-SN': selectBrandSN,
    }
}
</script>

<style lang="less">

</style>