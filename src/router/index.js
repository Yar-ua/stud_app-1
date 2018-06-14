import Vue from 'vue'
import Router from 'vue-router'
import AddsList from '@/components/AddsList'
import Login from '@/components/Login'
import Register from '@/components/Register'
import SingleAdd from '@/components/SingleAdd'
import AddForm from '@/components/AddForm'
import AddItem from '@/components/AddItem'
import Page404 from '@/components/Page404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:page?/:type?/:sort?',
      name: 'AddsList',
      component: AddsList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/products/:id(\\d+)/:preview?',
      name: 'SingleAdd',
      component: SingleAdd
    },
    {
      path: '/products/:id(\\d+|new)',
      name: 'AddForm',
      component: AddForm
    },
    {
      path: '/products/:id(\\d+)/:preview?',
      name: 'AddItem',
      component: AddItem
    },
    {
      path: 'Page404',
      name: 'Page404',
      component: Page404
    }
  ],
  mode: 'history'
})
