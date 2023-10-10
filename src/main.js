import 'es6-promise/auto'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

if (import.meta.env.MODE === 'development') {
    const {worker} = await import('./mock/browser');
    worker.start();
}

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
