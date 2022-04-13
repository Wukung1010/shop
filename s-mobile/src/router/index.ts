import Order from '../pages/Order.vue'
import SearchOrder from '../pages/SearchOrder.vue'
import SearchChangeOrder from '../pages/SearchCannelOrder.vue'
import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

const routes = [
  { path: '/:id?', component: Login },
  { path: '/main', component: Main, children: [
    { path: 'order', component: Order },
    { path: 'searchOrder', component: SearchOrder },
    { path: 'searchChangeOrder', component: SearchChangeOrder },
  ]},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((route) => {
  if (store.state.user.phone.length === 0 && route.path.includes('/main')) {
    router.push(`/`)
  }
})

export default router
