import apiClient from '@/services/EmployeesServices'

export const state = {
  employees: [],
  currentEmployee: {},
  totalEmployees: 0
}

export const mutations = {
  SET_EMPLOYEES: (state, employees) => {
    state.employees = employees
  },
  SET_CURRENT_EMPLOYEE: (state, employee) => {
    state.currentEmployee = employee
  },
  SET_TOTAL: (state, total) => {
    state.totalEmployees = total
  },
  DEL_EMPLOYEE: (state, id) => {},
  EDIT_EMPLOYEE: (state, index, newData) => {
    state.employees[index] = newData
  }
}

export const actions = {
  fetchEmployees: ({ commit }) => {
    apiClient.getEmployees()
      .then(res => {
        commit('SET_TOTAL', res.headers['x-total-count'])
        commit('SET_EMPLOYEES', res.data)
      })
      .catch(error => {
        console.log('Error', error.response)
      })
  },
  fetchCurrentEmployee: ({ commit }, id) => {
    if (id === '0' || id === 0) {
      commit('SET_CURRENT_EMPLOYEE', {
        fullName: '',
        birth: '',
        position: '',
        dep: '',
        gender: 'Муж'
      })
    } else {
      return apiClient.getEmployee(id)
        .then(res => {
          commit('SET_CURRENT_EMPLOYEE', res.data)
        })
    }
  },
  editEmployee: ({ commit, state, dispatch }, { id, data }) => {
    apiClient.editEmployee(id, data)
      .then(() => {
        dispatch('fetchEmployees')
      })
      .catch(error => {
        console.log('Error', error.response)
      })
    dispatch('fetchEmployees')
  },
  delEmployee: ({ commit, dispatch }, employeeId) => {
    apiClient.delEmployee(employeeId)
      .then(() => {
        dispatch('fetchEmployees')
      })
      .catch(error => {
        console.log('Error', error.response)
      })
  },
  createEmployee: ({ commit, state, dispatch }, data) => {
    apiClient.addEmploy(data)
      .then(() => {
        dispatch('fetchEmployees')
      })
  }
}

export const getters = {
  employee: (state) => id => {
    return state.currentEmployee
  },
  allEmployeesCount: (state) => {
    return state.employees.length
  },
  womanEmployeesCount: (state) => {
    return state.employees.filter(item => item.gender === 'Жен').length
  },
  manEmployeesCount: (state) => {
    return state.employees.filter(item => item.gender === 'Муж').length
  },
  averageAge: (state) => {
    const oldsArr = state.employees?.map(item => {
      const birthYear = item.birth.split('-')[0]
      const currYear = new Date().getFullYear()
      return parseInt(currYear - parseInt(birthYear))
    })
    const ageSum = (oldsArr.length) ? oldsArr.reduce((a, b) => a + b) : 1
    return Math.floor(ageSum / state.employees.length)
  },
  ItEmployeesCount: (state) => {
    return state.employees.filter(item => item.dep === 'IT').length
  },
  marketingEmployeesCount: (state) => {
    return state.employees.filter(item => item.dep === 'Маркетинг').length
  },
  bookerEmployeesCount: (state) => {
    return state.employees.filter(item => item.dep === 'Бухгалтерия').length
  }
}
