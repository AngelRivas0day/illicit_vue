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
    path: '/productos/:id/:slug',
    name: 'Product',
    component: () => import(/* webpackChunkName: "Product" */ '../views/Product/Index.vue')
  },
  {
    path: '/productos/checkout/:id/:slug',
    name: 'Checkout',
    component: () => import(/* webpackChunkName: "Checkout" */ '../views/Checkout/Index.vue')
  },
  {
    path: '/productos/payment/:id/:slug',
    name: 'Payment',
    component: () => import(/* webpackChunkName: "Payment" */ '../views/Payment/Index.vue')
  },
  {
    path: '/productos/payment/done',
    name: 'PaymentSuccess',
    component: () => import(/* webpackChunkName: "PaymentSuccess" */ '../views/Payment/PaymentSuccess/Index.vue')
  },
  {
    path: '/productos/payment/error',
    name: 'PaymentError',
    component: () => import(/* webpackChunkName: "PaymentError" */ '../views/Payment/Error.vue')
  },
  {
    path: '/ubicaciones',
    name: 'Maps',
    component: () => import(/* webpackChunkName: "Maps" */ '../views/Maps/Index.vue')
  },
  {
    path: '/historias',
    name: 'Stories',
    component: () => import(/* webpackChunkName: "Stories" */ '../views/Stories/Index.vue')
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
