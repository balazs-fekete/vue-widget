import { createApp, defineCustomElement } from 'vue'
import './style.css'
import App from './App.vue'

const VueWidget = defineCustomElement(App)

customElements.define('vue-widget', VueWidget)

const app = createApp(App)
app.mount('#app')
