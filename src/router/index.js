import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Tabs from '@/components/Tabs'
import Document from '@/components/Document'

Vue.use(Router)
Vue.use(Vuetify, {
  iconfont: 'mdi'
})

export default new Router({
  routes: [{
    path: '/',
    component: Tabs
  }, {
    path: '/document',
    component: Document
  }]
})
