<template>
    <div class="orderSearch">
        <mt-header title="订单查询">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="goBack">返回</mt-button>
            </router-link>
        </mt-header>

        <section style="margin-top:15px;">
            <div @click="selectDateStart()">
                <mt-cell title="开单日期（始）" is-link value="请选择">
                    <span v-if="dateBegin != ''">{{dateBegin}}</span>
                </mt-cell>
            </div>
            <div @click="selectDateStart()">
                <mt-cell title="开单日期（终）" is-link value="请选择">
                    <span v-if="dateEnd != ''">{{dateEnd}}</span>
                </mt-cell>
            </div>

            <mt-field class="inputRight" label="订单号" placeholder="请输入订单号" v-model="orderNum"></mt-field>

            <div @click="selectDateStart()">
                <mt-cell title="客户名称" is-link value="请选择">
                    <span v-if="constName != ''">{{constName}}</span>
                </mt-cell>
            </div>
            <div @click="selectDateStart()">
                <mt-cell title="业务员" is-link value="请选择">
                    <span v-if="salesman != ''">{{salesman}}</span>
                </mt-cell>
            </div>
            <mt-datetime-picker v-model="dateBegin" ref="pickerBegin" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
            <!-- 工
                    <mt-datetime-picker v-model="dateBegin" type="date" @confirm="selectDateStart">
                        ddd
                    </mt-datetime-picker>B -->
        </section>

        <footer class="btnFooter btnNum2">
            <mt-button type="primary">查询</mt-button>
            <mt-button>清空</mt-button>
        </footer>

    </div>
</template>

<script>
export default {
    name: 'orderSearch',
    data() {
        return {
            dateBegin: '',
            dateEnd: '',
            orderNum: '',
            constName: '',
            salesman: ''
        }
    },
    methods: {
        selectDateStart() {
            this.$refs.pickerBegin.open();
        },
        goBack() {
            window.history.go(-1);
        }
    }
}
</script>
