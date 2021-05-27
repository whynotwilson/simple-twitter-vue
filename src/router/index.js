import { createRouter, createWebHashHistory } from 'vue-router'
import PageNotFound from '../views/PageNotFound.vue'
import SignIn from '../views/SignIn.vue'

const routes = [
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
