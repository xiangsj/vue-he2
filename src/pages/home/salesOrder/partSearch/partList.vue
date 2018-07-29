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
                    <div> {{item.ProvItemNo}}/{{item.EngineNo}} </div>
                    <div>
                        {{item.Item_C_Name}}、 {{item.Item_C_Spec}}、 {{item.Brand}}、 {{item.UseInCarBrief}}、 {{item.WHName}}
                    </div>
                    <div>
                        <span v-if="item.SaleQty">{{item.SaleQty}} {{item.C_Unit}} </span>
                        <span v-if="item.SalePrice">/ {{item.SalePrice}}</span>
                    </div>
                </dd>
                <label>
                    <input type="checkbox" v-model="checkedVal" :value="item">
                    <span>
                        <i class="iconfont no icon-hook-round"></i>
                        <i class="iconfont yes icon-hook-round"></i>
                    </span>
                </label>
            </dl>
            <div class="getMore text-center">
                <span v-if="loading"><i class="iconfont icon-loading"></i>努力加载中...</span>
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
            checkedVal: [],
            loading: false,
            obj: {},
            account: JSON.parse(this.$getCookie('account')),
            listData: []
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
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        },
        submit() {
            // log(this.checkedVal)
            if(this.checkedVal.length === 0){
                this.$toast('请选择配件')
                return
            }
            let idArr = []
            this.checkedVal.forEach(item=>{
                idArr.push(item.FID)
            })
            // log(idArr)
            // return
            this.$router.push('/home/partAdd/' + idArr)
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
        overflow: auto;
        background: #f7f8f9;
        -webkit-overflow-scrolling: touch;
        >dl {
            background: #fff;
            padding: 8px 15px;
            position: relative;
            min-height: 58px;
            border-bottom: 1px solid #eee;
            position: relative;
            label {
                // border: 1px solid blue;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 15px;
                input {
                    display: none;
                    &+span {
                        >i {
                            font-size: 22px;
                            &.no {
                                color: #ddd;
                            }
                            &.yes {
                                color: #008cee;
                                display: none;
                            }
                        }
                    }
                    &:checked+span {
                        >i {
                            &.no {
                                display: none;
                            }
                            &.yes {
                                display: inline-block;
                            }
                        }
                    }
                }
            }
            >dt {
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
            &:active {
                background-color: #f9f9f9;
            }
        }
    }
}
</style>