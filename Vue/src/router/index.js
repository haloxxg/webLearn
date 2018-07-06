import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from "components/Hello"
import Test from "components/Test2"
import Tool from '../utils/Tool';

Vue.use(VueRouter)

//根路由，作为一个拦截器，对所有路由页面做控制
const IndexRoute = {
    template: "<router-view></router-view>",
    beforeCreate() {
    },
    created() {
        let setting = {
            url: "stock/data?stock_code=600489",
            data: {stock_code: "600489"},
        }
        Tool.get(setting.url, setting.data)
    },
    beforeMount() {
        console.log("before mounte")
    },
    mounted() {
        console.log("mount")
    },
    beforeUpdate() {
        console.log("before update")
    },
    updated() {
        console.log("update")
    },
    beforeDestroy() {},
    destroyed() {},
    // render() {

    // }
}

const routes = [
    {
        path: "/", 
        component: IndexRoute, 
        children: [
            { path: "test", component: Test},
            {path: "foo", component: Hello},
            {path: "*",  component: Hello},
        ] 
    }
]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router