import './main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './pages/Login.vue'
import Main from './pages/Main.vue'
import Commodity from './pages/Commodity.vue'
import Order from './pages/Order.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Main, children: [
    { path: 'commodity', component: Commodity },
    { path: 'order', component: Order },
  ]},
]

const app = createApp(App)
app.use(createRouter({
  history: createWebHashHistory(),
  routes,
}))
app.mount('#app')
