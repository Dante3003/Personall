<template>
  <div class="col-md-4 col-sm-4 mb-4">
      <div class="card d-flex align-items-center shadow-sm text-light bg-dark pt-2">
        <div class="card-icon rounded-circle bg-dark p-4 w-50">
            <img :src="require('@/assets/' + img)" alt="icon" class="w-100">
        </div>
        <div class="card-body">
            <h6>{{title}}</h6>
            <h4 class="text-center font-weight-bold">{{count}}</h4>
        </div>
        <div class="w-100 bg-secondary py-3"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    count: {
      type: Number,
      reuqired: true
    },
    img: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
