import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// Vue.prototype.apiServer = 'http://192.168.3.100:8001'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
