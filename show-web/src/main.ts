import { Store } from './types'
import './main.css'
import { createApp } from 'vue'
import CommodityList from './pages/CommodityList.vue'
import Order from './pages/Order.vue'
import SearchOrder from './pages/SearchOrder.vue'
import SearchChangeOrder from './pages/SearchChangeOrder.vue'
import Search from './pages/Search.vue'
import Login from './pages/Login.vue'
import Main from './pages/Main.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { createStore } from 'vuex'

const routes = [
  { path: '/', component: Login },
  { path: '/main', component: Main, children: [
    { path: 'order', component: Order },
    { path: 'commodityList', component: CommodityList },
    { path: 'searchOrder', component: SearchOrder },
    { path: 'searchChangeOrder', component: SearchChangeOrder },
  ]},
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const store = createStore<Store>({
  state () {
    return {
      title: '万顺丰建材配送商城',
      loadedCommodities: false,
      commodities: [],
      user: {
        phone: '',
        name: '',
        adress: '',
        remarks: '',
      },
      orders: [],
    }
  },
  mutations: {
    initCommodityList (state, list) {
      state.commodities = list
    },
    addToCart (state, { count, commodity }) {
      const item = state.orders.find(({ id: i }) => i === commodity.id)
      if (item) {
        item.buyCount += count
        item.buyCount = Math.max(1, item.buyCount)
      } else {
        state.orders.push({ buyCount: Math.max(1, count), ...commodity })
      }
    },
    removeFromCart (state, id) {
      const index = state.orders.findIndex(({ id: i }) => i === id)
      if (index > -1) {
        state.orders.splice(index, 1)
      }
    },
    phone (state, phone) {
      state.user.phone = phone
    },
    user (state, info) {
      state.user = { ...state.user, ...info }
    },
  },
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
