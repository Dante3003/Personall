<template>
  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 d-flex flex-column mb-4">
    <div
      class="card h-100 p-2 btn"
      :class="{'shadow-lg': isHovered}"
      v-b-hover="hoverAction"
      @click="$router.push({name: 'SinglePage', params: {id: employee.id}})"
    >
      <div>
        <img class="w-50 rounded-circle img-center" src="@/assets/employeePhoto.jpg" alt="">
      </div>
      <div class="card-body">
        <h5 class="card-title">{{employee.fullName}}</h5>
        <p class="mb-0">{{employee.position}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeCart',
  props: ['employee'],
  data () {
    return {
      isHovered: false
    }
  },
  methods: {
    hoverAction (hovered) {
      this.isHovered = hovered
    }
  }
}
</script>

<style>
</style>
