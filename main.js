import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.apiServer = uni.getStorageSync('address')
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
