import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import History from '../views/History.vue'
import Register from '../views/Register.vue'
import Detail from '../views/Detail.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { auth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { auth: false }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    meta: { auth: true, checkAdmin: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta.auth === true) {
    if (store.getters['auth/getToken']) {
      next()
    } else {
      alert('You must login first')
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta.checkAdmin === true) {
    if (localStorage.getItem('access') === '0') {
      next()
    } else {
      alert('U cannot acces this endpoint')
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
