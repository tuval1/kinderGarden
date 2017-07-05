import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import kids from '@/components/kids.vue'
import admin from '@/components/admin/admin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/',
      name: 'kids',
      component: kids
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
})
