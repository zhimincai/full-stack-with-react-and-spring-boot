import axios from 'axios'
import {API_URL} from '../../Constants'
class TodoDataService {

    getTodoList(name) {
        return axios.get(`${API_URL}/users/${name}/todos`)
    }

    getTodo(name, id) {
        return axios.get(`${API_URL}/users/${name}/todos/${id}`)
    }
    
    deleteTodo(name, id) {
        return axios.delete(`${API_URL}/users/${name}/todos/${id}`)
    }

    updateTodo(name, id, todo) {
        return axios.put(`${API_URL}/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {
        return axios.post(`${API_URL}/users/${name}/todos`, todo)
    }
}

export default new TodoDataService()