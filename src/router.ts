import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(Router)

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
      meta: { hidden: true }
    },
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
      meta: { hidden: true }
    },
    {
      path: '/',
      component: Layout,
      redirect: '/system-state',
      meta: { hidden: true }
    },
    {
      path: '/system-state',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/system-state/index.vue'),
          meta: {
            title: '系统状态',
            icon: 'system-state'
          }
        }
      ]
    },
    {
      path: '/parameter-setting',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/parameter-setting/index.vue'),
          meta: {
            title: '参数设定',
            icon: 'tree'
          }
        }
      ]
    },
    {
      path: '/realname-audit',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/realname-audit/index.vue'),
          meta: {
            title: '实名审核',
            icon: 'tree'
          }
        }
      ]
    },
    {
      path: '/presentation-audit',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/presentation-audit/index.vue'),
          meta: {
            title: '提现审核',
            icon: 'money'
          }
        }
      ]
    },
    {
      path: '/user-management',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/user-management/index.vue'),
          meta: {
            title: '用户管理',
            icon: 'peoples'
          }
        }
      ]
    },
    {
      path: '/system-mass-distribution',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/system-mass-distribution/index.vue'),
          meta: {
            title: '系统群发',
            icon: 'tree'
          }
        }
      ]
    },
    {
      path: '/system-setting',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/system-setting/index.vue'),
          meta: {
            title: '系统设置',
            icon: 'tree'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    }
  ]
})
