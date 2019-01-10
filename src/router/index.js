import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Tabs from '@/components/Tabs'

Vue.use(Router)
Vue.use(Vuetify, {
  iconfont: 'mdi'
})

export default new Router({
  routes: [{
    path: '/',
    component: Tabs
  }]
})
