<template>
  <div class="">
    <Header />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import store from '@/store/index'
import Header from '@/views/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  },
  beforeRouteEnter (routeTo, routeFrom, next) {
    NProgress.start()
    store.dispatch('fetchEmployees').then(() => {
      NProgress.done()
      next()
    })
  }
}
</script>

<style>

</style>
