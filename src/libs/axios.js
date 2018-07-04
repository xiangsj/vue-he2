import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios
import { MessageBox } from 'mint-ui';

//http request 请求头拦截器
//http://www.php.cn/js-tutorial-394773.html
import { getCookie } from "@/libs/utils.js";
// console.log(getCookie("code"))
axios.interceptors.request.use(config => {
  // console.log(config)
  //排除此接口，其他自动加上 cookie
  if (config.url !== "/api/TokenCheck") {
    let token = getCookie("token");
    if (!token) {
      MessageBox('no token', '请重新获取手机令牌');
    }
    //请求方式
    let method = config.method.toLowerCase();
    if (method === 'get' || method === 'delete') {
      Object.assign(config.params, {
        "token": token
      });
    }
  }
  return config;
}, error => {
  return Promise.reject(err);
});

//http response 后台返回拦截器
axios.interceptors.response.use(response => {
  // console.log(response)
  if (typeof response.data === 'string') {
    return JSON.parse(response.data);
  } else {
    return response;
  }
}, error => {
  return Promise.reject(error)
});

