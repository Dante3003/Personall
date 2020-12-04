<template>
  <div class="">
    <div class="container">
      <h1 class="mb-3 pt-2">Сотрудники</h1>
      <div class="row d-flex justify-content-end pb-3">
        <div class="mr-3">
          <label for="departments">Фильтр по отделу: </label>
          <select name="department" id="departments" v-model="depFilter">
            <option value="Все">Все</option>
            <option :value="dep" v-for="dep in department" :key="dep">
              {{ dep }}
            </option>
          </select>
        </div>
        <div>
          <label for="gender">Фильтрация по полу</label>
          <select name="gender" id="gender" v-model="genFilter">
            <option value="Все">Все</option>
            <option value="Муж">Муж</option>
            <option value="Жен">Жен</option>
          </select>
        </div>
      </div>
      <p v-if="!paginatedEmployees.length">Сотрдуников не найдено!</p>
      <div class="row d-flex">
        <EmployeeCard
          v-for="employee in paginatedEmployees"
          :key="employee.id"
          :employee="employee"
        />
      </div>
      <div class="d-flex align-items-center">
        <router-link
          v-if="currPage != 1"
          :to="{ name: 'Employees', query: { page: currPage - 1 } }"
          rel="prev"
          >&lt; Предыдущая</router-link>
        <div
          class="btn"
          :class="{ disabled: page === currPage }"
          v-for="page in pages"
          :key="page"
          @click="pageClick(page)"
        >
          {{ page }}
        </div>
        <router-link
          v-if="hasNextPage"
          :to="{ name: 'Employees', query: { page: currPage + 1 } }"
          rel="next"
          >Следющая &gt;</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import EmployeeCard from '@/views/components/Employee.vue'

export default {
  name: 'EmployeesPage',
  data () {
    return {
      depFilter: 'Все',
      genFilter: 'Все',
      isHovered: false
    }
  },
  components: {
    EmployeeCard
  },
  methods: {
    ...mapActions(['fetchEmployees']),
    pageClick (page) {
      if (page !== this.currPage) {
        this.$router.push({ name: 'Employees', query: { page: page } })
      }
    },
    hoverAction (hovered) {
      this.isHovered = hovered
    }
  },
  created () {
    this.perPage = 6
  },
  computed: {
    ...mapState({
      employees: state => state.employee.employees,
      totalEmployees: state => state.employee.totalEmployees,
      department: state => state.dep.dep
    }),
    currPage () {
      return parseInt(this.$route.query.page || 1)
    },
    hasNextPage () {
      return this.employeesList.length > this.currPage * this.perPage
    },
    employeesList () {
      if (this.depFilter === 'Все' && this.genFilter === 'Все') {
        return this.employees
      }
      if (this.depFilter === 'Все' && this.genFilter !== 'Все') {
        return this.employees.filter(item => item.gender === this.genFilter)
      }
      if (this.depFilter !== 'Все' && this.genFilter === 'Все') {
        return this.employees.filter(item => item.dep === this.depFilter)
      }
      return this.employees.filter(item => item.dep === this.depFilter && item.gender === this.genFilter)
    },
    pages () {
      return Math.ceil(this.employeesList.length / this.perPage)
    },
    paginatedEmployees () {
      const from = (this.currPage - 1) * this.perPage
      const to = from + this.perPage
      return this.employeesList.slice(from, to)
    }
  }
}
</script>

<style>
</style>
