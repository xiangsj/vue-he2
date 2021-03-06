import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios
import { MessageBox } from 'mint-ui';

//http request 请求头拦截器
//http://www.php.cn/js-tutorial-394773.html
import { getCookie } from "@/libs/utils.js";
// console.log(getCookie("code"))
axios.interceptors.request.use(config => {

  // 排除此接口，不加 cookie
  if (config.url !== "/api/TokenCheck") {
    let token = getCookie("token");
    if (!token) {
      // MessageBox('no token', '请重新获取手机令牌');
      MessageBox.alert('no token').then(action => {
        self.location.href = "/";
      });
      return;
    }
    //请求方式
    switch (config.method.toLowerCase()) {
      case 'get':
      case 'delete':
        Object.assign(config.params, {
          "token": token
        });
        break;
      case 'post':
        Object.assign(config.data, {
          "token": token
        });
        break;
      default:
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

