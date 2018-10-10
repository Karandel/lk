import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import TicketList from '@/components/TicketList'
import TicketView from '@/components/TicketView'
import TicketAddComment from '@/components/TicketAddComment'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'TicketList',
      component: TicketList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tickets/:ticketNumber',
      name: 'TicketView',
      component: TicketView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tickets/:ticketNumber/comments/add',
      name: 'TicketAddComment',
      component: TicketAddComment,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('ALP_ITIL_API_SessionID') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
