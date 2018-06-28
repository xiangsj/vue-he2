<template>
    <div>
        <div class="tabContent searchBody2">
            <mt-field class="inputRight" :label="itemData.ShowCaption" :placeholder="'请输入'+itemData.ShowCaption" v-model="inputValue"></mt-field>
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
        itemData: {
            type: Object,
            default: function() {
                return {}
            }
        },
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
        }
    },
    created() {
        // console.log(this.itemData)
    },
    methods: {
        submit() {
            if (this.inputValue === '') {
                Toast('请输入'+this.itemData.ShowCaption);
                return;
            }
            let data = {
                inputValue: this.inputValue,
                mSortNo: this.mSortNo,
                designFieldId: this.itemData.FID
            }
            let url = '/home/detail4/' +
                JSON.stringify(data);
            this.$router.push(url);
        },
        clear() {
            this.inputValue = '';
            Toast('已清空');
        }
    }
}
</script>

<style lang="less">

</style>