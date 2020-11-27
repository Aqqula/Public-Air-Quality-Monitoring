import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import Main from './components/Main.vue'
import Info from './components/Info.vue'

const routes = [
    { path: '/', component: Main},
    { path: '/saveecobot-info', component: Info}
]

const router = new VueRouter({
    routes
})

Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    el: '#App',
    router
 })

 