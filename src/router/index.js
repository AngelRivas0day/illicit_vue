import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '@/views/User/Index.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home/Index.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Auth/Index.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/productos',
    name: 'Products',
    component: () => import(/* webpackChunkName: "Products" */ '../views/Products/Index.vue')
  },
  {
    path: '/productos/:slug',
    name: 'Product',
    component: () => import(/* webpackChunkName: "Product" */ '../views/Product/Index.vue')
  },
  {
    path: '/checkout/:id',
    name: 'Checkout',
    component: () => import(/* webpackChunkName: "Product" */ '../views/Checkout/Index.vue')
  },
  {
    path: '/ubicaciones',
    name: 'Maps',
    component: () => import(/* webpackChunkName: "Maps" */ '../views/Maps/Index.vue')
  },
  {
    path: '/contacto',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "Contact" */ '../views/Contact/Index.vue')
  },
  {
    path: '*',
    name: 'Error404',
    component: () => import(/* webpackChunkName: "Error" */ '../views/Error/Index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
