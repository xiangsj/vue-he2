<template>
    <div>
        <div class="tabContent searchBody2">
            <mt-field class="inputRight" label="Vin码" :placeholder="placeholder" v-model="inputValue"></mt-field>
            <div class="text-center">
                <mt-button size="small" type="primary" @click="submit()">搜索</mt-button>
                <mt-button size="small" @click="clear()">清除</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    name: 'searchBody2',
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
            inputValue: '',
            placeholder: '请输入Vin码'
        }
    },
    created() {

    },
    methods: {
        submit(){
            if(this.inputValue === ''){
                Toast(this.placeholder);
                return;
            }
            let url = '/home/detail2/' + 
            this.inputValue + '&&' +
            this.mSortNo;
            this.$router.push(url);            
        },
        clear(){
            this.inputValue = '';
            Toast('已清空');
        }
    }
}
</script>

<style lang="less">

</style>