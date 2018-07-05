import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import login from '@/pages/login'

import home from '@/pages/home/index'
import main from '@/pages/home/main'
import orderSearch from '@/pages/home/orderSearch'
import search from '@/pages/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        
        {
          path: 'main',
          name: 'main',
          component: main,
          meta: {keepAlive: true}
        },
        {
          path: 'orderSearch',
          name: 'orderSearch',
          component: orderSearch,
          meta: {keepAlive: true}
        },
        {
          path: 'search/:id',
          name: 'search',
          component: search,
          meta: {keepAlive: true}
        },        
    ]
    }
  ]
})

