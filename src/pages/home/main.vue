<template>
    <div class="homeMain">
        <header>
            <span>欢迎admin登录</span>
            <span class="pull-right">帐套：魂牵梦萦</span>
        </header>
        <section>
            <ul>
                <li>aaaa</li>
                <li>aaaa</li><br>
                <li>aaaa</li>
            </ul>
        </section>
        <footer>
            <mt-button size="large">退出</mt-button>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'homeMain',
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<style lang="less">
.homeMain{
    background-color: #f7f8f9;
    section{
        >ul{
            // border:1px solid red;
            text-align: center;
            width: 280px;
            margin: 0 auto;
            >li{
                float: left;
                width: 120px;
                height: 120px;
                line-height: 120px;
                font-size: 28px;
                border-radius: 4px;
                text-align: center;
                margin: 8px;
                background: #fff;
                margin-right: 10px;
                color:#313033;
            }
        }
    }
    header{
        padding: 20px;
    }
    footer{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 15px;
    }
}
</style>