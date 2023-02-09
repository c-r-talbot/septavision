import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'
// import axios from './plugins/axios'

// import './assets/main.css'

const app = createApp(App)
// app.config.globalProperties.$log = console.log

// app.use(createPinia())
// app.use(axios, {
//     baseUrl: "44.208.162.57.nip.io/wp-json/wp/v2"
// })
// app.use(router)

app.mount('#app')
