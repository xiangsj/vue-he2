import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from "@/libs/utils.js";

import index from '@/pages/index'
import login from '@/pages/login'

import home from '@/pages/home/index'
import main from '@/pages/home/main'

import orderSearch from '@/pages/home/orderSearch/index'
import orderSearchList from '@/pages/home/orderSearch/list'
import orderSearchDetail from '@/pages/home/orderSearch/detail'

import salesOrder from '@/pages/home/salesOrder/index'
import partSearch from '@/pages/home/salesOrder/partSearch/index'
import partList from '@/pages/home/salesOrder/partSearch/partList'
import partAdd from '@/pages/home/salesOrder/partSearch/partAdd'

import stockQuery from '@/pages/home/stockQuery/index'
import stockQuerySearch from '@/pages/home/stockQuery/search'
import stockQueryList from '@/pages/home/stockQuery/list'

import addCompany from '@/pages/home/addCompany/index'

import accountQuery from '@/pages/home/accountQuery/index'
import accountQuerySearch from '@/pages/home/accountQuery/search'
import accountQueryList from '@/pages/home/accountQuery/list'

Vue.use(Router)

const router = new Router({
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
          meta: { keepAlive: true } //false为不缓存
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
          path: 'partAdd/:string',
          name: 'partAdd',
          component: partAdd,
          meta: { keepAlive: false } //false为不缓存
        },
        {
          path: 'stockQuery',
          name: 'stockQuery',
          component: stockQuery,
          meta: { keepAlive: false }, //false为不缓存
          children: [
            {
              path: 'search',
              name: 'stockQuerySearch',
              component: stockQuerySearch,
              meta: { keepAlive: false } //false为不缓存
            },
            {
              path: 'list/:string',
              name: 'list',
              component: stockQueryList,
              meta: { keepAlive: false } //false为不缓存
            }
          ]
        },
        {
          path: 'addCompany',
          name: 'addCompany',
          component: addCompany,
          meta: { keepAlive: false } //false为不缓存
        },
        {
          path: 'accountQuery',
          name: 'accountQuery',
          component: accountQuery,
          meta: { keepAlive: false }, //false为不缓存
          children: [
            {
              path: 'search',
              name: 'accountQuerySearch',
              component: accountQuerySearch,
              meta: { keepAlive: false } //false为不缓存
            },
            {
              path: 'list/:string',
              name: 'accountQueryList',
              component: accountQueryList,
              meta: { keepAlive: false } //false为不缓存
            }
          ]
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  // 只有进入 项目 才开始检验
  // log(to)
  if (to.path.indexOf('/home') !== -1 && to.path != '/home/main') {

    let apps = getCookie('apps').split(',')
    let hasNav = []
    to.path.split('/').forEach(item => {
      apps.forEach(item2 => {
        if (item == item2) {
          hasNav.push(item)
        }
      })
    })
    if (hasNav.length === 0) {
      log(apps)
      log(to)
      log(hasNav)
      // router.push('/login')
    }

  }

  next()
})

export default router