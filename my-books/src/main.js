import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'
import store from './store'
import router from './routes'


createApp(App).use(router).use(store).use(vue3GoogleLogin, {
  clientId:  import.meta.env.VITE_CLIENT_ID,
  scope: 'profile email https://www.googleapis.com/auth/books',
}
).mount('#app')


