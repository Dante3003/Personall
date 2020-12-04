<template>
  <div class="page-wrap d-flex flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12 text-center">
          <span class="display-1 d-block">404</span>
          <div class="mb-4 lead">{{ resource }} не найден(а).</div>
          <router-link :to="{ name: 'Home' }" class="btn btn-link">Главная страница</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    resource: {
      type: String,
      default: 'Страница'
    }
  }
}
</script>

<style>
</style>
