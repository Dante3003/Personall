<template>
  <div class="container px-2">
    <h1>Сотрудник</h1>
    <form class="shadow-sm d-flex flex-column justify-content-left text-left px-4 py-3 mx-auto w-75">
      <div class="form-group mb-3">
        <label for="name" class="font-weight-bold">ФИО</label>
        <input
          placeholder="ФИО"
          id="name"
          class="form-control"
          :disabled="!editable"
          :class="{'border border-danger': $v.currentEmployee.fullName.$error}"
          v-model="currentEmployee.fullName"
          @blur="$v.currentEmployee.fullName.$touch()"
        />
        <template v-if="$v.currentEmployee.fullName.$error">
          <p v-if="!$v.currentEmployee.fullName.required" class="text-danger">Это поле объязательно нужно заполнить!</p>
          <p v-if="!$v.currentEmployee.fullName.minLength" class="text-danger">Заполните поле правильно.</p>
        </template>
      </div>
      <div class="form-group mb-3">

        <label for="department" class="font-weight-bold">Отдел </label>
        <select
          name="department"
          id="department"
          v-model="currentEmployee.dep"
          class="form-control"
          :class="{'border border-danger': $v.currentEmployee.dep.$error}"
          :disabled="!editable"
          @blur="$v.currentEmployee.dep.$touch()"
        >
          <option :value="dep" v-for="dep in department" :key="dep">{{dep}}</option>
        </select>
        <p v-if="$v.currentEmployee.dep.$error" class="text-danger">Это поле объязательно нужно заполнить!</p>
      </div>

      <div class="form-group mb-3">
        <label for="position" class="font-weight-bold">Должность</label>
        <input
          type="text"
          id="position"
          placeholder="Должность"
          class="form-control"
          :class="{'border border-danger': $v.currentEmployee.position.$error}"
          v-model="currentEmployee.position"
          @blur="$v.currentEmployee.position.$touch()"
          :disabled="!editable"
        />
        <template v-if="$v.currentEmployee.position.$error">
          <p v-if="!$v.currentEmployee.position.required" class="text-danger">Это поле объязательно нужно заполнить!</p>
          <p v-if="!$v.currentEmployee.position.minLength" class="text-danger">Заполните поле правильно.</p>
        </template>
      </div>

      <div class="form-group mb-3">
        <span class="font-weight-bold">Пол: </span>
        <input type="radio" name="gender" id="man" value="Муж"  v-model="currentEmployee.gender" :disabled="!editable" />
        <label for="man" class="mb-0 mr-2">Муж</label>

        <input type="radio" name="gender" id="woman" value="Жен" v-model="currentEmployee.gender" :disabled="!editable" />
        <label for="woman" class="mb-0">Жен</label>
      </div>

      <div class="form-group mb-3">
        <label for="birth" class="font-weight-bold">Дата рождения </label>
        <input
          type="date"
          id="birth"
          placeholder="Дата рождения"
          class="form-control"
          v-model="currentEmployee.birth"
          :class="{'border border-danger': $v.dateObject.$error}"
          @blur="$v.dateObject.$touch()"
          :disabled="!editable"
        />
        <template v-if="$v.dateObject.$error">
          <p class="text-danger">Укажите правильную дату</p>
        </template>
      </div>

      <div class="form-group mb-3">
        <b-button
          variant="success"
          @click.prevent="save"
          :disabled="$v.$anyError"
          v-if="editable || Number(id) === 0"
        >Сохранить</b-button>

        <b-button
          variant="info"
          v-else
          @click.prevent="edit"
        >
          Изменить
        </b-button>

        <b-button
          variant="secondary"
          class="mx-2"
          @click.prevent="$router.go(-1)"
        >Назад</b-button>

        <b-button
          variant="danger"
          v-if="Number(id) !== 0"
          @click.prevent="deleteEmployee"
        >Удалить</b-button>
        <p class="text-danger" v-if="$v.$anyError">Пожалуйста заполните форму правильно!</p>
      </div>

      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="info"
        @dismissed="dismissCountDown=0"
      >
        <p>Изменения сохранены!</p>
      </b-alert>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, minLength, maxValue } from 'vuelidate/lib/validators'

export default {
  name: 'SingleEmployee',
  props: {
    id: {
      type: [Number, String]
    }
  },
  data () {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      editable: false
    }
  },
  methods: {
    ...mapActions(['editEmployee', 'delEmployee', 'createEmployee']),
    save () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.dismissCountDown = this.dismissSecs
        const id = this.id
        if (this.id === 0 || this.id === '0') {
          this.createEmployee(this.currentEmployee)
          return
        }
        this.editEmployee({ id: id, data: this.currentEmployee })
      }
    },
    deleteEmployee () {
      this.delEmployee(this.id)
      this.$router.push({ name: 'Employees' })
    },
    edit () {
      this.editable = !this.editable
    }
  },
  computed: {
    ...mapState({
      currentEmployee: state => state.employee.currentEmployee,
      department: state => state.dep.dep
    }),
    dateObject () {
      return this.currentEmployee.birth ? new Date(this.currentEmployee.birth) : null
    }
  },
  validations: {
    currentEmployee: {
      fullName: { required, minLength: minLength(8) },
      position: { required, minLength: minLength(4) },
      dep: { required }
    },
    dateObject: {
      required,
      maxValue: maxValue(new Date())
    }
  }
}
</script>

<style>
</style>
