import axios from 'axios'
import {API_URL} from '../../Constants'
class ScheduleDataService {

    getScheduledShiftList(name) {
        return axios.get(`${API_URL}/users/${name}/schedule`)
    }

    clearSchedule(name) {
        return axios.delete(`${API_URL}/users/${name}/clear-schedule`)
    }
    
    getMatchEmployeeList(name, shift_id) {
        return axios.get(`${API_URL}/users/${name}/shift-match/${shift_id}`)
    }

}

export default new ScheduleDataService()