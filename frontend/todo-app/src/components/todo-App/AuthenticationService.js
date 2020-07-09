import axios from "axios";
import {API_URL} from '../../Constants'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        // console.log(JwtAuthHeader)
        return axios.post(`${API_URL}/authenticate`, {username, password})
    }

    registerSuccessfulLoginForJwt(username, token) {
        console.log("registerSuccessfulLoginForJwt...")
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        // encode authentication info
        return 'Bearer ' + token
    }

    executeBasicAuthenticationService(username, password) {
        let basicAuthHeader = this.createBaiscAuthToken(username, password)
        // console.log(basicAuthHeader)
        return axios.get(`${API_URL}/basicauth`, 
            {headers: {authorization: basicAuthHeader}})
    }

    createBaiscAuthToken(username, password) {
        // encode authentication info
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin (username, password) {
        console.log("registerSuccessfulLogin...")
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBaiscAuthToken(username, password))
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user === null) return false
        return true
    }

    getUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user === null) return false
        return user
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()