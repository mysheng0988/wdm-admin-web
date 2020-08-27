import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    meta: {title: '首页', icon: 'home',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]}
    }]
  },
  {
    path: '/screen',
    component: Layout,
    redirect: '/screen/task',
    name: 'screen',
    meta: {title: '筛查管理', icon: 'icon-sift',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
    children: [
      {
        path: 'task',
        name: 'task',
        component: () => import('@/views/screen/task'),
        meta: {title: '初筛任务', icon: 'patient',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },
      {
        path: 'examine',
        name: 'examine',
        component: () => import('@/views/screen/examine'),
        meta: {title: '审核数据', icon: 'patient',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },
      {
        path: 'examineData',
        name: 'examineData',
        component: () => import('@/views/screen/examineData'),
        meta: {title: '审核数据', icon: 'patient',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
        hidden:true
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('@/views/screen/report'),
        meta: {title: '报告管理', icon: 'patient',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },
      {
        path: 'pdf',
        name: 'pdf',
        component: () => import('@/views/screen/pdf'),
        meta: {title: '查看报告', icon: 'patient',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
        hidden:true
      },
      {
        path: 'invite',
        name: 'invite',
        component: () => import('@/views/screen/invite'),
        meta: {title: '复查邀约', icon: 'patient',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      }
    ]
  },
  {
    path: '/mon',
    component: Layout,
    redirect: '/mon/reTask',
    name: 'mon',
    meta: {title: '监测中心', icon: 'icon-monitor',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
    children: [
      {
        path: 'reTask',
        name: 'reTask',
        component: () => import('@/views/mon/reTask'),
        meta: {title: '复查任务', icon: 'checkup',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },
      {
        path: 'result',
        name: 'result',
        component: () => import('@/views/mon/reResult'),
        meta: {title: '复查结果', icon: 'product-list',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },{
        path: 'act-rep',
        name: 'act-rep',
        component: () => import('@/views/mon/act-rep'),
        meta: {title: '动态监测报告', icon: 'product-list',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },{
        path: 'report',
        name: 'act-report',
        component: () => import('@/views/mon/report'),
        meta: {title: '查看报告', icon: 'product-list',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
        hidden:true
      },{
        path: 'pdf',
        name: 're-pdf',
        component: () => import('@/views/mon/pdf'),
        meta: {title: '复查报告', icon: 'product-list',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
        hidden:true
      }
    ]
  },
  {
    path: '/diag',
    name: 'diag',
    component: Layout,
    redirect: '/diag/diagnose',
    meta: {title: '确诊管理', icon: 'icon-diagnose',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
    children: [
      {
        path: 'diagnose',
        name: 'diagnose',
        component: () => import('@/views/diag/diagnose'),
        meta: {title: '确诊管理', icon: 'report-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },{
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/plan/index'),
        meta: {title: '编辑报告', icon: 'product-attr',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
        hidden:true,
      }
    ],
  },
  {
    path:'/plan',
    component: Layout,
    redirect: '/plan/index',
    name: 'sms',
    meta: {title: '365计划', icon: 'icon-365-plan',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
    children: [
      {
        path: 'follow',
        name: 'follow',
        component: () => import('@/views/plan/index'),
        meta: {title: '随访管理', icon: 'report-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
        hidden:true,
      },{
        path: 'order',
        name: 'order',
        component: () => import('@/views/plan/order'),
        meta: {title: '订单管理', icon: 'report-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },{
        path: 'member',
        name: 'member',
        component: () => import('@/views/plan/member'),
        meta: {title: '会员管理', icon: 'report-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },{
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/plan/memDetail'),
        meta: {title: '会员管理', icon: 'report-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
        hidden:true,
      },{
        path: 'ordetail',
        name: 'ordetail',
        component: () => import('@/views/plan/orderDetail'),
        meta: {title: '会员管理', icon: 'report-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
        hidden:true,
      }
    ]
  },
  {
    path:'/msg',
    component: Layout,
    redirect: '/msg/device',
    name: 'msg',
    meta: {title: '信息维护', icon: 'icon-msg',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
    children: [
      {
        path: 'device',
        name: 'device',
        component: () => import('@/views/msg/device'),
        meta: {title: '设备管理', icon: 'admin-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]} 
      },
      {
        path: 'firm',
        name: 'firm',
        component: () => import('@/views/msg/firm'),
        meta: {title: '厂商管理', icon: 'admin-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]} 
      },
      {
        path: 'monitor',
        name: 'monitor',
        component: () => import('@/views/msg/monitor'),
        meta: {title: '监测中心', icon: 'admin-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]} 
      },
      {
        path: 'organ',
        name: 'organ',
        component: () => import('@/views/msg/organ'),
        meta: {title: '机构管理', icon: 'admin-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]} 
      },
      {
        path: 'students',
        name: 'students',
        component: () => import('@/views/msg/students'),
        meta: {title: '学生管理', icon: 'admin-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]} 
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/msg/users'),
        meta: {title: '用户管理', icon: 'admin-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]} 
      }
    ],
  },
  {
    path:'/user',
    component: Layout,
    redirect: '/user/account',
    name: 'user',
    meta: {title: '系统管理', icon: 'icon-sys',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
    children: [
      {
        path: 'hos',
        name: 'hos',
        component: () => import('@/views/user/hosManagement'),
        meta: {title: '医院管理',icon:"icon-hos",roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },
      {
        path: 'hos2',
        name: 'hos2',
        component: () => import('@/views/user/hosManagement'),
        meta: {title: '医生管理',icon:"icon-hos",roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/user/accountManagement'),
        meta: {title: '账户管理', icon: 'admin-icon',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/user/roleManagement'),
        meta: {title: '角色权限',icon:"sms-subject",roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      },
      {
        path: 'dep',
        name: 'dep',
        component: () => import('@/views/user/depManagement'),
        meta: {title: '部门管理', icon: 'icon-dep',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]}
      },
    ]
  },
  {path: '',
    component: Layout,
    redirect: '/404',
    hidden: true,
    children: [{
      path:'404',
      name:"404",
      component: () => import('@/views/404'),
      meta: {title: '404', icon: 'sms-flash',roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]},
      hidden: true
    }]
  },
  {path: '*', redirect: '/404', hidden: true,roleId:[1,10,11,12,13,14,15,16,17,18,19,20,21,22,21,22,23,24,25,26,27,28.29]}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

