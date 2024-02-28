import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

console.log(import.meta.env)
app.mount('#app')
