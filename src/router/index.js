import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
import { lazyLoadView, setRouterEvent,importView } from './util.js';

// 我的
const My = () => lazyLoadView(import('@/view/frame/My.vue'));
// 我创建的
const MyCreated = () => lazyLoadView(import('@/view/my/MyCreated.vue'));
// 我关注的
const MyFollow = () => lazyLoadView(import('@/view/my/MyFollow.vue'));
// 数据库管理
const DbManage = () => lazyLoadView(import('@/view/my/DbManage.vue'));
// 编辑数据库（含新建）
const DbEdit = () => lazyLoadView(import('@/view/my/DbEdit.vue'));
// 监控分类管理
const MonitorType = () => lazyLoadView(import('@/view/my/MonitorType.vue'));
// 监控分类编辑
const MonitorTypeEdit = () => lazyLoadView(import('@/view/my/MonitorTypeEdit.vue'));
//待办事项
const Agenda = () => lazyLoadView(import('@/view/my/Agenda.vue'));
//处理事项
const DealTodo =  () => lazyLoadView(import('@/view/my/DealTodo.vue'));
//新建监控
const CreateMonitor = () => lazyLoadView(import('@/view/frame/CreateMonitor.vue'));
//首页(用不一样的加载方式、为的是触发组件路由钩子)
const Home =  importView('view/frame/Home.vue');
//统计分析(用不一样的加载方式、为的是触发组件路由钩子)
const StatisticAnalysis = importView('view/stat/StatisticAnalysis.vue');
//过滤界面
const FilterType = () => lazyLoadView(import('@/view/other/FilterType.vue'));
//主体界面
const Frame = ()  =>lazyLoadView(import('@/view/frame/Frame.vue'));
//系统异常界面(404)
const NotFound =  ()  =>lazyLoadView(import('@/view/system/NotFound.vue'));
//系统异常界面(500)
const ServerError =  ()  =>lazyLoadView(import('@/view/system/ServerError.vue'));
const routes = [
  {
    path: '/',
    redirect: '/frame'
  },
 {
   path:'/frame',
   component:Frame,
   children:[
    {
      path: '',
      redirect:'home'
    } ,
    {
      path: 'home',
      component:Home,
      meta: {
        title: '首页'
      }
    } ,
    {
      path:'statisticAnalysis',
      component:StatisticAnalysis,
      meta: {
        title: '统计分析'
      }
    },
    {
      path: 'my',
      component: My,
      meta: {
        title: '我的'
      }
    },
    {
      path: 'createMonitor',
      component: CreateMonitor,
      meta: {
        title: '新建监控'
      }
    },
    {
      path: 'editMonitor',
      component: CreateMonitor,
      meta: {
        title: '编辑监控'
      }
    }
   ]
  },{
    path: '/myCreated',
    component: MyCreated,
    meta: {
      title: '我创建的'
    }
  }, {
    path: '/myFollow',
    component: MyFollow,
    meta: {
      title: '我关注的'
    }
  }, 
  {
    path: '/dbManage',
    component: DbManage,
    meta: {
      title: '数据库管理'
    }
  }, 
  {
    path: '/dbEdit',
    component: DbEdit,
    meta: {
      title: '数据库编辑'
    }
  }, 
  {
    path: '/dbAdd',
    component: DbEdit,
    meta: {
      title: '新建数据库'
    }
  }, {
    path: '/monitorType',
    component: MonitorType,
    meta: {
      title: '监控分类管理'
    }
  }, {
    path: '/monitorTypeEdit',
    component: MonitorTypeEdit,
    meta: {
      title: '监控分类编辑'
    }
  }, {
    path: '/monitorTypeAdd',
    component: MonitorTypeEdit,
    meta: {
      title: '新建监控分类'
    }
  },
  {
    path: '/agenda',
    component: Agenda,
    meta: {
      title: '待办事项'
    }
  },
  {
    path: '/dealTodo',
    component: DealTodo,
    meta: {
      title: '报警处理'
    }
  },{
    path:'/filterType',
    component: FilterType,
    meta: {
      title: '过滤类型'
    }
  },{
    path:'*',
    redirect:'/404'
  },
  {
    path:'/404',
    component:NotFound,
    meta:{
      title: '错误页'
    }
  },
  {
    path:'/500',
    component:ServerError,
    meta:{
      title: '错误页'
    }
  }
];

const router = new Router({  mode: 'history',routes });
setRouterEvent(router);
export {
  router
};
