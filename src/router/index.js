import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import kids from '@/components/kids.vue'
import admin from '@/components/admin/admin.vue'
import login from '@/components/login/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    
    {
      path: '/',
      name: 'kids',
      component: kids
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
