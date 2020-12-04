import Vue from 'vue'
import Vuex from 'vuex'
import * as dep from '@/store/modules/department.js'
import * as employee from '@/store/modules/employee.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dep,
    employee
  }
})
