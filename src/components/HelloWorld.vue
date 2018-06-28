<template>
  <div class="hello text-center">
    <h1>{{ msg }}</h1>
    <router-link to="/home/index/?weiXinCode=gh_6297f82da266">Go to index</router-link>
<!-- 
    <h2>Essential Links</h2>
    <mt-button @click.native="handleClick">toast</mt-button>
    <ul>
      <li>list</li>
    </ul>
    <mt-button @click.native="apiGet">apiGet</mt-button> -->
  </div>
</template>

<script>
import { getCookie, setCookie } from "@/libs/utils.js";
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'HelloWorld'
    }
  },
  created(){
    // setCookie("userName", "bb");
  },
  methods: {
    set: function(name, value, days) {

      var d = new Date;

      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);

      window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();

    },

    get: function(name) {

      var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

      return v ? v[2] : null;

    },

    delete: function(name) {

      this.set(name, '', -1);

    },
    handleClick: function() {
      this.$toast('Hello world!')
    },
    apiGet() {
      this.$http.get('/api/ProdSort', { params: {} }).then(res => {
        // console.log(JSON.parse(res.data))
        // this.msg = res.msg;
        // success callback
      }, res => {
        // error callback
      });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  // border: 1px solid red;
  ul>li {
    border: 1px solid red;
  }
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
