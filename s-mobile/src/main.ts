import './main.css'
import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

store.commit('distributor', window.location.search.replace('?id=', ''))

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
