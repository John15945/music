import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect:'/login',
      component: ()=>import('@/components/Home')
    },
    {
      path     : '/invite',
      name     : 'Invite',
      component: ()=>import('@/views/Invite')
    } ,
    {
      path     : '/register',
      name     : 'Register',
      component: ()=>import('@/views/Register')
    },
    {
      path     : '/login',
      name     : 'Login',
      component: () => import('@/views/Login')
    },
    {
      path     : '/award',
      name     : 'Award',
      component: () => import('@/views/Award')
    },
    {
      path     : '/share',
      name     : 'Share',
      component: () => import('@/views/Share')
    }
  ]
})
