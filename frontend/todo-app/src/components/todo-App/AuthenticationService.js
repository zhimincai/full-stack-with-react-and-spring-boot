import axios from "axios";

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        let basicAuthHeader = this.createBaiscAuthToken(username, password)
        // console.log(basicAuthHeader)
        return axios.get('http://localhost:8080/basicauth', 
            {headers: {authorization: basicAuthHeader}})
    }

    createBaiscAuthToken(username, password) {
        // encode authentication info
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin (username, password) {
        console.log("registerSuccessfulLogin...")
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(this.createBaiscAuthToken(username, password))
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user === null) return false
        return true
    }

    getUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user === null) return false
        return user
    }

    setupAxiosInterceptors(basicAuthHeader) {

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()