import Vue from 'vue'
import App from 'components/app'
import router from './router/index'
import store from "./store/index"
import GetData from 'components/GetData'

Vue.component("GetData", GetData)

var app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        GetData
    },
    render: h => h(App)
})
