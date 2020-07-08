import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            username: 'bbchai',
            password: '',
            loginStatus: 0
        }
        this.loginClicked = this.loginClicked.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    loginClicked () {
        // if (this.state.username === "bbchai" && this.state.password === "dummy"){
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //     this.setState({loginStatus : 1})
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // }
        // else{
        //     // console.log("fail")
        //     this.setState({loginStatus : 2})
        // }

        console.log("loginClicked...")
        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                console.log(response)
                AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
                this.setState({loginStatus : 1})
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(() => {
                console.log("error")
                this.setState({loginStatus : 2})
            })
            
    }

    // general control states at once
    handleChange (event) {
        this.setState({ [event.target.name] : event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                
                <ShowCredentialStatus loginStatus={this.state.loginStatus}/>
                <div className='container'>
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password}  onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                    {/* <form onSubmit={this.loginClicked}>
                        User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                        Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        <button type="submit" className="btn btn-light">Login</button>
                    </form> */}
                </div>
            </div>
        )
    }
}

function ShowCredentialStatus (props) {
    if (props.loginStatus === 2) {
        return <div className='alert alert-warning'>Invalid Credential! Please enter your username and password again!</div>
    }
    return <div className='alert alert-secondary'>Please enter your username and password!</div>
}

export default LoginComponent