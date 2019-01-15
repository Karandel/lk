import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import TicketList from '@/components/TicketList'
import TicketView from '@/components/TicketView'
import TicketAddComment from '@/components/TicketAddComment'
import ManualList from '@/components/ManualList'
import ReportList from '@/components/ReportList'
import HelpList from '@/components/HelpList'

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
      component: TicketList
    },
    {
      path: '/tickets/:ticketNumber',
      name: 'TicketView',
      component: TicketView
    },
    {
      path: '/tickets/:ticketNumber/comments/add',
      name: 'TicketAddComment',
      component: TicketAddComment
    },
    {
      path: '/manuals',
      name: 'ManualList',
      component: ManualList
    },
    {
      path: '/reports',
      name: 'ReportList',
      component: ReportList
    },
    {
      path: '/help',
      name: 'HelpList',
      component: HelpList
    }
  ]
})

export default router
