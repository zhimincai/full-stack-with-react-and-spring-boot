import axios from 'axios'
import {API_URL} from '../../Constants'
class ShiftDataService {

    getShiftList(name) {
        return axios.get(`${API_URL}/users/${name}/shifts`)
    }
    
    getShiftListOfDay(name, dayOfWeek) {
        return axios.get(`${API_URL}/users/${name}/shifts/day_of_week/${dayOfWeek}`)
    }

    getShift(name, id) {
        return axios.get(`${API_URL}/users/${name}/shifts/${id}`)
    }
    
    deleteShift(name, id) {
        return axios.delete(`${API_URL}/users/${name}/shifts/${id}`)
    }

    updateShift(name, id, shift) {
        return axios.put(`${API_URL}/users/${name}/shifts/${id}`, shift)
    }

    createShift(name, shift) {
        return axios.post(`${API_URL}/users/${name}/shifts`, shift)
    }

    assignNewEmployee(name, id, assigned_employee_id) {
        return axios.get(`${API_URL}/users/${name}/shifts/${id}/assign/${assigned_employee_id}`)
    }
}

export default new ShiftDataService()