import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import list from '@/components/kids.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/list',
      name: 'list',
      component: list
    }
  ]
})
