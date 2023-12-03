import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(ToastService)

app.mount('#app')
