<template>
    <div class="partList">
        <mt-header title="选择开单配件">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>

        <section>
            <dl v-for="(item,index) in listData" :key="index">
                <dt>
                    <img v-if="item.mSmallPic" :src="item.mSmallPic">
                    <i v-else class="iconfont icon-pic"></i>
                </dt>
                <dd>
                    <div>
                        {{item.ProvItemNo}}/{{item.EngineNo}}
                        <span class="pull-right">
                            <!-- {{item.SaleQty}} {{item.C_Unit}} * {{item.SalePrice}} -->
                        </span>
                    </div>
                    <div>
                        {{item.Item_C_Name}}、 {{item.Item_C_Spec}}、 {{item.Brand}}、 {{item.UseInCarBrief}}、 {{item.WHName}}
                    </div>
                </dd>
            </dl>
            <div class="getMore text-center">
                <span v-if="loading">努力加载中...</span>
                <span v-else>没有更多了</span>
            </div>
        </section>

        <footer class="btnFooter">
            <mt-button type="primary" @click="submit()">确定</mt-button>
        </footer>

    </div>
</template>

<script>
export default {
    name: 'partList',
    data() {
        return {
            loading: false,
            obj: {},
            account: JSON.parse(this.$getCookie('account')),
            listData: {}
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            let obj = {}
            this.loading = true
            try {
                obj = JSON.parse(this.$route.params.string);
                this.obj = obj;
                // console.log(obj)
            } catch (e) {
                this.$toast('参数有误')
                return;
            }
            let data = {
                fid: this.account.fid,
                itemNo: obj.itemNo,
                itemCName: obj.itemCName,
                brand: obj.brand,
                brandID: obj.brandID,
                vehicleID: obj.vehicleID,
                styleID: obj.styleID
            }
            // console.log(data)
            this.$http.get('/api/FittingsSearch', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    this.loading = false
                    let backList = res.data.DataList;
                    // console.log(backList)
                    if (backList.length === 0) {
                        this.$messageBox.alert('暂无数据，返回重新查询').then(action => {
                            this.$router.go(-1);
                        });
                        return;
                    }
                    this.listData = backList
                } else {
                    this.$toast(res.data.message);
                }
            }, res => { });
        },
        submit() {
            log('sssure')
        }
    }
}
</script>

<style lang="less" scoped>
.partList {
    section {
        position: absolute;
        top: 40px;
        right: 0;
        bottom: 60px;
        left: 0;
        overflow: auto; // padding-bottom: 25px;
        background: #f7f8f9;
        >dl {
            background: #fff;
            padding: 8px 15px;
            position: relative;
            min-height: 58px;
            border-bottom: 1px solid #eee;
            >dt {
                // background: #eee;
                width: 55px;
                height: 55px;
                line-height: 55px;
                text-align: center;
                position: absolute;
                left: 15px;
                top: 50%;
                margin-top: -27px;
                i {
                    font-size: 46px;
                    color: #909399;
                }
            }
            >dd {
                margin-left: 66px;
                padding-top: 6px;
                line-height: 22px;
                >div {
                    clear: both;
                }
            }
        }
    }
}
</style>