import { setTitle, getCookie } from './libs/utils'
import Vue from 'vue'

import App from './App'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/iconfont/iconfont.css'
Vue.use(MintUI)

import { Toast, MessageBox } from 'mint-ui';
Vue.prototype.$toast = Toast;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$setTitle = setTitle;
Vue.prototype.$getCookie = getCookie;

import Moment from 'moment'
Vue.prototype.$moment = Moment;


import axios from './libs/axios'

Vue.config.productionTip = false

let _global = {
  status: 'S'
}
Vue.prototype.GLOBAL = _global;


new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
