import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Profile from '@/views/profile/index'
import Server from '@/views/console/server'
import Login from '@/views/im/login'
import Alone from '@/views/im/alone'
import Group from '@/views/im/group'
import Online from '@/views/im/online'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Home,
    redirect: '/server',
    meta: {
      title: '首页'
    },
    children: [{
        path: 'server',
        name: 'Server',
        component: Server,
        meta: {
          title: '服务器控制台'
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: {
          title: '敬请期待'
        }
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          title: '登录'
        }
      },
      {
        path: '/alone',
        name: 'Alone',
        component: Alone,
        meta: {
          title: '单聊'
        }
      },
      {
        path: '/group',
        name: 'Group',
        component: Group,
        meta: {
          title: '群聊'
        }
      },
      {
        path: '/online',
        name: 'Online',
        component: Online,
        meta: {
          title: '在线'
        }
      }
    ]
  }]
})