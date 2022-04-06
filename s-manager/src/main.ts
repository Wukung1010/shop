import './main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './api'

api.setErrorHandler((res: Response) => {
  if (res.status === 401) {
    router.push('/')
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
