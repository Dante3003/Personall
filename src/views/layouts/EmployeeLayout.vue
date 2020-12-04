<template>
  <div class="">
    <Header />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/views/components/Header.vue'
export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>

<style>

</style>
