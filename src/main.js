import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import tooltip from "./utils/tooltip.js";
import "@/assets/tooltip.css";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

createApp(App).directive("tooltip", tooltip).use(router).mount('#app')
