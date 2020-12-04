<template>
  <div>
      <h1 class="py-4">Dashboard</h1>
      <div class="row d-flex justify-content-between">
        <Card title="Количество сотрудников" :count="allEmployeesCount" :img="srcObject.users" />
        <Card title="Количество женщин" :count="womanEmployeesCount" :img="srcObject.womans" />
        <Card title="Количество мужчин" :count="manEmployeesCount" :img="srcObject.mans" />
        <Card title="Количество сотрудников в IT" :count="ItEmployeesCount" :img="srcObject.settings" />
        <Card title="Количество сотрудников в Маркетниге" :count="marketingEmployeesCount" :img="srcObject.marketing" />
        <Card title="Количество сотрудников в Бухгалтерии" :count="bookerEmployeesCount" :img="srcObject.accounting" />
        <Card title="Средний возраст сотрудников" :count="averageAge" :img="srcObject.users" />
      </div>
  </div>
</template>

<script>
import Card from '@/views/components/Card.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Card
  },
  data () {
    return {
      srcObject: {
        users: 'users.svg',
        womans: 'woman.svg',
        mans: 'mann.svg',
        marketing: 'marketing.svg',
        accounting: 'accounting.svg',
        settings: 'settings.svg'
      }
    }
  },
  computed: {
    ...mapGetters(['allEmployeesCount', 'womanEmployeesCount', 'manEmployeesCount', 'averageAge', 'ItEmployeesCount', 'marketingEmployeesCount', 'bookerEmployeesCount'])
  },
  methods: {},
  mounted () {
    // console.log(this.averageAge)
  }
}
</script>
