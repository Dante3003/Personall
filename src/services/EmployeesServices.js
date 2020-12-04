
import apiClient from '@/services/apiClient.js'

export default {
  getEmployees () {
    return apiClient.get('/employees')
  },
  getEmployee (id) {
    return apiClient.get(`/employees/${id}`)
  },
  addEmploy: (data) => {
    return apiClient.post('/employees', JSON.stringify(data))
  },
  getByFitler: (ftr, ftrV) => {
    return apiClient.get(`/employees?${ftr}=${ftrV}`)
  },
  editEmployee: (id, data) => {
    return apiClient.put(`/employees/${id}`, data)
  },
  delEmployee: (id) => {
    return apiClient.delete(`/employees/${id}`)
  }
}
