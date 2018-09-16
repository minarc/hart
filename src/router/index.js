import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Search from '@/components/Search'
import Input from '@/components/Input'
import Today from '@/components/Today'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  routes: [{
    path: '/',
    component: Search
  }, {
    path: '/input',
    component: Input
  }, {
    path: '/today',
    component: Today
  }]
})
