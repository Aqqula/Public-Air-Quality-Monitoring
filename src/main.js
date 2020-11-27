import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import Info from './components/Info.vue'

const routes = [
    { path: '/', component: App},
    { path:'/SaveEcoBot-Info/', component: Info}
]

const router = new VueRouter({
    routes
})

new Vue({
    render: h => h(App),
    el: '#App',
    router
 })