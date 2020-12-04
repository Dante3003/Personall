<template>
  <header>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <router-link :to="{ name: 'Home' }" tag="li" exact active-class="active">
          <a class="nav-link">Главная</a>
        </router-link>
        <router-link :to="{ name: 'Employees' }" tag="li" active-class="active">
          <a class="nav-link">Список сотрудников</a>
        </router-link>
      </b-navbar-nav>
      <div class="ml-auto">
        <b-button
          variant="outline-primary"
          @click="$router.push({ name: 'SinglePage', params: { id: 0 } })"
          v-b-tooltip.hover="{ variant: 'info' }"
          title="Добавить нового сотрудника"
        >Добавить</b-button>
      </div>
    </b-navbar>
    </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>

</style>
