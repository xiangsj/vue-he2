import Vue from 'vue'
import Router from 'vue-router'

import index from '@/pages/index'
import login from '@/pages/login'

import home from '@/pages/home/index'
import main from '@/pages/home/main'

import orderSearch from '@/pages/home/orderSearch/index'
import orderSearchList from '@/pages/home/orderSearch/list'
import orderSearchDetail from '@/pages/home/orderSearch/detail'

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
          meta: { keepAlive: false } // false为不缓存
        },
        {
          path: 'orderSearch',
          name: 'orderSearch',
          component: orderSearch,
          meta: { keepAlive: false } // false为不缓存
        },
        {
          path: 'orderSearchList/:string',
          name: 'orderSearchList',
          component: orderSearchList,
          meta: { keepAlive: false } // false为不缓存
        },
        {
          path: 'orderSearchDetail/:string',
          name: 'orderSearchDetail',
          component: orderSearchDetail,
          meta: { keepAlive: false } //false为不缓存
        },
      ]
    }
  ]
})

