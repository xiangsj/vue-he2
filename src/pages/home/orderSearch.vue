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
                <mt-cell title="开单日期（始）" is-link value="请选择">
                    <span v-if="dateBegin != ''">{{dateBegin}}</span>
                </mt-cell>
                <mt-cell title="开单日期（始）" is-link value="请选择">
                    <span v-if="dateBegin != ''">{{dateBegin}}</span>
                </mt-cell>
                <mt-cell title="开单日期（始）" is-link value="请选择">
                    <span v-if="dateBegin != ''">{{dateBegin}}</span>
                </mt-cell>
            </div>
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
            dateBegin:'',
            dateEdn:'',
        }
    },
    methods:{
        selectDateStart(){

        },
        goBack(){
            window.history.go(-1);
        }
    }
}
</script>
