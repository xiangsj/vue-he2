import Vue from 'vue'
import Router from 'vue-router'

import index from '@/pages/index'
import login from '@/pages/login'

import home from '@/pages/home/index'
import main from '@/pages/home/main'

import orderSearch from '@/pages/home/orderSearch/index'
import orderSearchList from '@/pages/home/orderSearch/list'
import orderSearchDetail from '@/pages/home/orderSearch/detail'

import salesOrder from '@/pages/home/salesOrder/index'
import partSearch from '@/pages/home/salesOrder/partSearch/index'
import partList from '@/pages/home/salesOrder/partList/index'
import partAdd from '@/pages/home/salesOrder/partAdd/index'

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
        {
          path: 'salesOrder',
          name: 'salesOrder',
          component: salesOrder,
          meta: { keepAlive: false } //false为不缓存
        },
        {
          path: 'partSearch',
          name: 'partSearch',
          component: partSearch,
          meta: { keepAlive: false } //false为不缓存
        },
        {
          path: 'partList/:string',
          name: 'partList',
          component: partList,
          meta: { keepAlive: false } //false为不缓存
        },
        {
          path: 'partAdd',
          name: 'partAdd',
          component: partAdd,
          meta: { keepAlive: false } //false为不缓存
        },
      ]
    }
  ]
})

