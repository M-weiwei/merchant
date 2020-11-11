import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './assets/config/api'
import axios from 'axios'



import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.prototype.$http = axios // 将ajax请求挂在到vue原形上
Vue.prototype.api = api // 将ajax请求挂在到vue原形上

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')