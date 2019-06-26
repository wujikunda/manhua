import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        hidden: true,
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/comic-cont',
    component: Layout,
    redirect: '/comic-cont/category',
    name: '内容中心',
    meta: {
      title: '内容中心',
      icon: 'table'
    },
    children: [
      {
        path: 'category/create',
        component: () => import('@/views/comic-cont/category-add'),
        name: 'categoryCreate',
        hidden: true,
        meta: { title: '添加分类', icon: 'edit' }
      },
      {
        path: 'category/edit/:id(\\d+)',
        component: () => import('@/views/comic-cont/category-add'),
        name: 'categoryEdit',
        meta: { title: '编辑分类', noCache: true, activeMenu: '/comic-cont/category' },
        hidden: true
      },
      {
        path: 'category',
        component: () => import('@/views/comic-cont/category'),
        name: 'categoryList',
        meta: { title: '分类', icon: 'list' }
      },
      {
        path: 'tag/create',
        component: () => import('@/views/comic-cont/tag-add'),
        name: 'tagCreate',
        hidden: true,
        meta: { title: '添加标签', icon: 'edit' }
      },
      {
        path: 'tag/edit/:id(\\d+)',
        component: () => import('@/views/comic-cont/tag-add'),
        name: 'tagEdit',
        meta: { title: '编辑标签', noCache: true, activeMenu: '/comic-cont/tag-add' },
        hidden: true
      },
      {
        path: 'tag',
        component: () => import('@/views/comic-cont/tag'),
        name: 'tagList',
        meta: { title: '标签', icon: 'list' }
      },
      {
        path: 'comic/create',
        component: () => import('@/views/comic-cont/comic-add'),
        name: 'comicCreate',
        hidden: true,
        meta: { title: '添加漫画', icon: 'edit' }
      },
      {
        path: 'comic/edit/:id(\\d+)',
        component: () => import('@/views/comic-cont/comic-add'),
        name: 'comicEdit',
        meta: { title: '编辑漫画', noCache: true, activeMenu: '/comic-cont/comic-add' },
        hidden: true
      },
      {
        path: 'section/:id(\\d+)',
        component: () => import('@/views/comic-cont/section'),
        name: 'sectionList',
        meta: { title: '章节列表', noCache: true, activeMenu: '/comic-cont/comic-add' },
        hidden: true
      },
      {
        path: 'section/add',
        component: () => import('@/views/comic-cont/section-add'),
        name: 'sectionAdd',
        meta: { title: '章节新增', noCache: true, activeMenu: '/comic-cont/section' },
        hidden: true
      },
      {
        path: 'section/edit/:id(\\d+)',
        component: () => import('@/views/comic-cont/section-add'),
        name: 'sectionEdit',
        meta: { title: '章节编辑', noCache: true, activeMenu: '/comic-cont/comic-add' },
        hidden: true
      },
      {
        path: 'comic',
        component: () => import('@/views/comic-cont/comic'),
        name: 'comicList',
        meta: { title: '漫画中心', icon: 'list' }
      }
    ]
  },
  {
    path: '/comic-user',
    component: Layout,
    redirect: '/comic-user/index',
    name: '用户中心',
    meta: {
      title: '用户中心',
      icon: 'peoples'
    },
    children: [
      {
        path: 'detail',
        component: () => import('@/views/comic-user/detail'),
        name: 'comic-user-detail',
        hidden: true,
        meta: { title: '用户详情', icon: 'edit' }
      },
      {
        path: 'index',
        component: () => import('@/views/comic-user/index'),
        name: 'comic-user',
        meta: { title: '用户中心', icon: 'peoples' }
      }
    ]
  },
  {
    path: '/comic-account',
    component: Layout,
    redirect: '/comic-account/index',
    name: '账户中心',
    meta: {
      title: '账户中心',
      icon: 'money'
    },
    children: [
      {
        path: 'recharge',
        component: () => import('@/views/comic-account/recharge'),
        name: 'comic-account-recharge',
        meta: { title: '充值记录', icon: 'list' }
      },
      {
        path: 'withdrawal',
        component: () => import('@/views/comic-account/withdrawal'),
        name: 'comic-account-withdrawal',
        meta: { title: '提现记录', icon: 'list' }
      }
    ]
  },
  {
    path: '/comic-sale',
    component: Layout,
    redirect: '/comic-sale/index',
    name: '营销中心',
    meta: {
      title: '营销中心',
      icon: 'table'
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/comic-sale/add'),
        name: 'comic-sale-add',
        hidden: true,
        meta: { title: '新增', icon: 'edit' }
      },
      {
        path: 'index',
        component: () => import('@/views/comic-sale/index'),
        name: 'comic-sale',
        meta: { title: '营销列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/comic-setting',
    component: Layout,
    redirect: '/comic-setting/index',
    name: '设置中心',
    meta: {
      title: '设置中心',
      icon: 'theme'
    },
    children: [
      {
        path: 'price',
        component: () => import('@/views/comic-setting/price'),
        name: 'comic-setting',
        meta: { title: '漫币等价规则', icon: 'edit', noCache: true }
      },
      {
        path: 'invite',
        component: () => import('@/views/comic-setting/invite'),
        name: 'comic-setting-invite',
        meta: { title: '邀请人规则', icon: 'edit' }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    hidden: true,
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
