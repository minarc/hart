import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Tabs from '@/components/Tabs'
import Today from '@/components/Today'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  routes: [{
    path: '/',
    component: Tabs
  }, {
    path: '/today',
    component: Today
  }]
})
