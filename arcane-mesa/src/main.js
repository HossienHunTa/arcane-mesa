import Vue from 'vue'
import VueRouter from "vue-router"
import VueCookies from 'vue-cookies'
import VueSocialSharing from 'vue-social-sharing'
import App from './App.vue'


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// router setup
import routes from "./routes/routes"
const router = new VueRouter({ routes })

Vue.use(VueRouter)
Vue.use(VueCookies)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSocialSharing);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
