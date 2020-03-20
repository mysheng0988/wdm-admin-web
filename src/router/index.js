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
    hidden:true,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    },{
      path: 'home/addShop',
      name: 'home/addShop',
      component: () => import('@/views/home/add'),
      meta: {title: '添加店铺'},
      hidden: true
    },{
      path: 'home/update',
      name: 'home/update',
      component: () => import('@/views/home/update'),
      meta: {title: '店铺详情'},
      hidden: true
    }]
  },
  {
    path: '/pat',
    component: Layout,
    redirect: '/pat/list',
    name: 'pat',
    meta: {title: '患者管理', icon: 'management'},
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/pat/index'),
        meta: {title: '患者管理', icon: 'product-list'},
      },
      {
        path: 'patAdd',
        name: 'patAdd',
        component: () => import('@/views/pat/add'),
        meta: {title: '新增患者', icon: 'product-add'},
        hidden:true,
      },
      {
        path: 'patUpdate',
        name: 'patUpdate',
        component: () => import('@/views/pat/update'),
        meta: {title: '修改患者', icon: 'product-update'},
        hidden:true,
      },
      {
        path: 'addRecord',
        name: 'addRecord',
        component: () => import('@/views/pat/addRecord'),
        meta: {title: '新增病历', icon: 'product-add'},
        hidden:true,
      },
      {
        path: 'assessRecord',
        name: 'assessRecord',
        component: () => import('@/views/pat/assessRecord'),
        meta: {title: '测评记录', icon: 'product-comment'},
        hidden:true
      },
      {
        path: 'cureRecord',
        name: 'cureRecord',
        component: () => import('@/views/pat/cureRecord'),
        meta: {title: '治疗记录', icon: 'product-cate'},
        hidden:true,
      },
      {
        path: 'readRecord',
        name: 'readRecord',
        component: () => import('@/views/pat/readRecord'),
        meta: {title: '查看记录', icon: 'product-list'},
        hidden:true,
      }
    ]
  },
  {
    path: '/ips',
    component: Layout,
    redirect: '/ips/index',
    name: 'ips',
    meta: {title: '心身检查', icon: 'order'},
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/ips/index'),
        meta: {title: '心身检查', icon: 'product-list'},
      },
      {
        path: 'IPS-A',
        name: 'IPS-A',
        component: () => import('@/views/ips/IPS-A'),
        meta: {title: '专科测评', icon: 'product-list'},
        hidden:true,
      },{
        path: 'IPS-B',
        name: 'IPS-B',
        component: () => import('@/views/ips/IPS-B'),
        meta: {title: '综合测评', icon: 'product-list'},
        hidden:true,
      },{
        path: 'IPS-C',
        name: 'IPS-C',
        component: () => import('@/views/ips/IPS-C'),
        meta: {title: '筛查测评', icon: 'product-list'},
        hidden:true,
      },
      {
        path: 'resultHRV',
        name: 'resultHRV',
        component: () => import('@/views/ips/resultHRV'),
        meta: {title: '记录结果-HRV', icon: 'product-list'},
        hidden:true,
      },
      {
        path: 're-scale',
        name: 're-scale',
        component: () => import('@/views/ips/resultScale'),
        meta: {title: '记录结果-量表', icon: 'product-list'},
        hidden:true,
      },{
        path: 'questionResult',
        name: 'questionResult',
        component: () => import('@/views/ips/questionResult'),
        meta: {title: '答题结果', icon: 'product-list'},
        hidden:true,
      }
    ]
  },
  {
    path: '/rep',
    name: 'rep',
    component: Layout,
    redirect: '/rep/index',
    meta: {title: '心身报告', icon: 'sms-flash'},
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/rep/index'),
        meta: {title: '报告列表', icon: 'product-list'}
      },{
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/rep/edit'),
        meta: {title: '编辑报告', icon: 'product-attr'}
      },{
        path: 'pdf',
        name: 'pdf',
        component: () => import('@/views/rep/pdf'),
        meta: {title: '报告', icon: 'product-attr'}
      }
    ],
  },
  {
    path:'/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {title: '心身治疗', icon: 'sms'},
    children: [
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: {title: '广告列表', icon: 'sms-ad'}
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {title: '添加广告'},
        hidden:true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {title: '编辑广告'},
        hidden:true
      },
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '秒杀商品列表', icon: 'sms-flash'}
      },
      {
        path: 'flashSession',
        name: 'flashSession',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: '秒杀时间段列表'},
        hidden:true
      },
      {
        path: 'selectSession',
        name: 'selectSession',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {title: '秒杀时间段选择'},
        hidden:true
      },
      {
        path: 'flashProductRelation',
        name: 'flashProductRelation',
        component: () => import('@/views/sms/flash/productRelationList'),
        meta: {title: '秒杀商品列表'},
        hidden:true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '优惠券列表', icon: 'sms-coupon'}
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {title: '添加优惠券'},
        hidden:true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {title: '修改优惠券'},
        hidden:true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {title: '优惠券领取详情'},
        hidden:true
      },
      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: {title: '品牌推荐', icon: 'product-brand'}
      },
      {
        path: 'new',
        name: 'homeNew',
        component: () => import('@/views/sms/new/index'),
        meta: {title: '新品推荐', icon: 'sms-new'}
      },
      {
        path: 'hot',
        name: 'homeHot',
        component: () => import('@/views/sms/hot/index'),
        meta: {title: '人气推荐', icon: 'sms-hot'}
      },
      {
        path: 'subject',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: {title: '专题推荐', icon: 'sms-subject'}
      },

    ]
  },
  {
    path:'/param',
    component: Layout,
    redirect: '/param/cureItem',
    name: 'param',
    meta: {title: '参数配置', icon: 'param'},
    children: [
      {
        path: 'cureItem',
        name: 'cureItem',
        component: () => import('@/views/param/cureItem'),
        meta: {title: '治疗项目', icon: 'sms-ad'}
      },
      {
        path: 'assess',
        name: 'assess',
        component: () => import('@/views/param/assessItem'),
        meta: {title: '测评项目', icon: 'sms-flash'}
      },
      {
        path: 'scale',
        name: 'scale',
        component: () => import('@/views/param/scaleManage'),
        meta: {title: '量表管理',icon:'sms-new'},
      },

    ]
  },
  {
    path:'/user',
    component: Layout,
    redirect: '/user/account',
    name: 'user',
    meta: {title: '用户管理', icon: 'user-manage'},
    children: [
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/user/accountManagement'),
        meta: {title: '账户管理', icon: 'sms-ad'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/user/roleManagement'),
        meta: {title: '角色权限',icon:"sms-subject"},
      },
      {
        path: 'hos',
        name: 'hos',
        component: () => import('@/views/user/hosManagement'),
        meta: {title: '医院管理',icon:"sms-subject"},
      },
      {
        path: 'dep',
        name: 'dep',
        component: () => import('@/views/user/depManagement'),
        meta: {title: '科室管理', icon: 'sms-flash'}
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
      meta: {title: '404', icon: 'sms-flash'},
      hidden: true
    }]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

