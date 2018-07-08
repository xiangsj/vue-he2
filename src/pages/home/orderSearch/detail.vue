<template>
    <div class="orderSearchDetail">
        <mt-header title="订单详情">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
        </mt-header>

       {{detailData}}
    </div>
</template>

<script>
import { getCookie } from "@/libs/utils.js";

export default {
    name: 'orderSearchDetail',
    data() {
        return {
            obj: {},
            account: JSON.parse(getCookie('account')),
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
                console.log(obj)
            } catch (e) {
                console.log("nnn")
                return;
            }
            let data = {
                fid: this.account.fid,
                scNo: obj.scNo
            }
            console.log(data)
            this.$http.get('/api/OrderInfo', { params: data }).then(res => {
                if (res.data.status.toString() === this.GLOBAL.status) {
                    let data = res.data.DataList;
                    console.log(data)
                    this.detailData = data
                } else {
                    this.$toast(res.data.message);
                }
            }, res => { });
        }
    }
}
</script>
