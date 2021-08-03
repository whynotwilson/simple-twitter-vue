import { createRouter, createWebHashHistory } from 'vue-router'
import PageNotFound from '../views/PageNotFound.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/tweets'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/tweets',
    name: 'home',
    component: Home
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/tags',
    name: 'tags',
    component: () => import('../views/Tags.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: 'active',
  routes
})

export default router
