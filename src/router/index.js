import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Search from '@/components/Search'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  routes: [{
    path: '/',
    name: 'for Test',
    component: Search
  }]
})
