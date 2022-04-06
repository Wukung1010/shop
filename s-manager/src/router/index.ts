import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'
import Commodity from '../pages/Commodity.vue'
import Order from '../pages/Order.vue'
import Distributor from '../pages/Distributor.vue'
import Sys from '../pages/Sys.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Login },
    { path: '/main', component: Main, children: [
      { path: 'commodity', component: Commodity },
      { path: 'order', component: Order },
      { path: 'distributor', component: Distributor },
      { path: 'sys', component: Sys },
    ]},
  ]
})

router.beforeEach(() => {
  // 鉴权
})

export default router
