import axios from 'axios'
import {API_URL} from '../../Constants'
class EmployeeDataService {

    getEmployeeList(name) {
        return axios.get(`${API_URL}/users/${name}/employees`)
    }

    getEmployee(name, id) {
        return axios.get(`${API_URL}/users/${name}/employees/${id}`)
    }
    
    deleteEmployee(name, id) {
        return axios.delete(`${API_URL}/users/${name}/employees/${id}`)
    }

    updateEmployee(name, id, employee) {
        return axios.put(`${API_URL}/users/${name}/employees/${id}`, employee)
    }

    createEmployee(name, employee) {
        return axios.post(`${API_URL}/users/${name}/employees`, employee)
    }
}

export default new EmployeeDataService()