<template>
    <div class="orderSearchDetail" v-if="!isLoading">
        <mt-header title="订单详情">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>
        <section>
            <ul>
                <li>
                    <span class="label">客户</span>
                    <span class="value">{{detailData.Order.BriefName}}</span>
                </li>
                <li>
                    <span class="label">销往门店</span>
                    <span class="value">{{detailData.Order.BName}}</span>
                </li>
                <li>
                    <span class="label">客户联系人</span>
                    <span class="value">{{detailData.Order.BContact}}</span>
                </li>
                <li>
                    <span class="label">送货地址</span>
                    <span class="value">{{detailData.Order.DeliveryAddr}}</span>
                </li>
                <li>
                    <span class="label">开票类型</span>
                    <span class="value">{{detailData.Order.CSITypCaption}}</span>
                </li>
                <li>
                    <span class="label">发运方式</span>
                    <span class="value">{{detailData.Order.DeliveryMode}}</span>
                </li>
                <li>
                    <span class="label">付款方式</span>
                    <span class="value">{{detailData.Order.PaymentModeCaption}}</span>
                </li>
                <li>
                    <span class="label">业务员</span>
                    <span class="value">{{detailData.Order.SaleName}}</span>
                </li>
                <li>
                    <span class="label">开单日期</span>
                    <span class="value">{{$moment(detailData.Order.CreateDate).format('YYYY-MM-DD')}}</span>
                </li>
                <li>
                    <span class="label">销售单号</span>
                    <span class="value">{{detailData.Order.ScNo}}</span>
                </li>
                <li>
                    <span class="label">订单总金额</span>
                    <span class="value">{{Number(detailData.Order.TotSCAmt).toFixed(2)}}</span>
                </li>
                <li>
                    <span class="label">备注</span>
                    <span class="value">{{detailData.Order.Memo}}</span>
                </li>
            </ul>
            <h3>配件清单</h3>
            <dl v-for="(item,index) in detailData.OrderDetail" :key="index">
                <dt>
                    <img v-if="item.mSmallPic" :src="item.mSmallPic">
                    <i v-else class="iconfont icon-pic"></i>
                </dt>
                <dd>
                    <div>
                        {{item.ProvItemNo}}/{{item.EngineNo}}
                        <span class="pull-right">
                            {{Number(item.SaleQty).toFixed(0)}} {{item.C_Unit}} * {{Number(item.SalePrice).toFixed(2)}}
                        </span>
                    </div>
                    <div>
                        <span v-if="item.Item_C_Name">{{item.Item_C_Name}}、 </span>
                        <span v-if="item.Item_C_Spec">{{item.Item_C_Spec}}、 </span>
                        <span v-if="item.Brand">{{item.Brand}}、 </span>
                        <span v-if="item.UseInCarBrief">{{item.UseInCarBrief}}、 </span>
                        {{item.WHName}}
                    </div>
                </dd>
            </dl>
            <!-- {{detailData}} -->
        </section>

    </div>
</template>

<script>
export default {
    name: 'orderSearchDetail',
    data() {
        return {
            isLoading: true,
            obj: {},
            account: JSON.parse(this.$getCookie('account')),
            detailData: {}
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            let obj = {}
            try {
                obj = JSON.parse(this.$route.params.string);
                this.obj = obj;
                // console.log(obj)
            } catch (e) {
                // console.log("nnn")
                this.$toast('参数有误')
                return;
            }
            let data = {
                fid: this.account.fid,
                scNo: obj.scNo
            }
            // console.log(data)
            this.$http.get('/api/OrderInfo', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let data = res.data.DataList;
                    console.log(data)
                    this.detailData = data
                    this.isLoading = false
                } else {
                    this.$messageBox(res.data.message)
                }
            }, res => { });
        }
    }
}
</script>

<style lang="less" scoped>
.orderSearchDetail {
    // border: 1px solid red;
    height: 100%;
    section {
        position: absolute;
        top: 40px;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        padding-bottom: 25px;
        background: #f7f8f9;
        -webkit-overflow-scrolling: touch;
        >ul {
            background: #fff;
            >li {
                border-bottom: 1px solid #eee;
                padding: 8px 15px;
                .label {
                    color: #909399;
                }
                .value {
                    color: #303133;
                    float: right;
                    width: 77%; // text-align: right;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }

        >h3 {
            margin: 0;
            padding: 8px 15px;
        }
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
            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
