import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './Dev.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app');