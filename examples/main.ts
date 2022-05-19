import { createApp } from 'vue'
import CherryUI from '../packages/index'
import App from './App.vue'
console.log('first', CherryUI)
const app = createApp(App)
app.use(CherryUI)
app.mount('#app')
