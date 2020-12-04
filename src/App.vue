<template>
  <div id="app" class="text-center">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['fetchEmployees'])
  },
  mounted () {
    this.fetchEmployees()
  }
}
</script>

<style lang="scss">
</style>
