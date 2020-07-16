import axios from 'axios'
import {API_URL} from '../../Constants'
class AvailibilityDataService {

    getAvailibilityList(name) {
        return axios.get(`${API_URL}/users/${name}/availibilities`)
    }

    getAvailibility(name, id) {
        return axios.get(`${API_URL}/users/${name}/availibilities/${id}`)
    }
    
    deleteAvailibility(name, id) {
        return axios.delete(`${API_URL}/users/${name}/availibilities/${id}`)
    }

    updateAvailibility(name, id, availibility) {
        return axios.put(`${API_URL}/users/${name}/availibilities/${id}`, availibility)
    }

    createAvailibility(name, availibility) {
        return axios.post(`${API_URL}/users/${name}/availibilities`, availibility)
    }
}

export default new AvailibilityDataService()