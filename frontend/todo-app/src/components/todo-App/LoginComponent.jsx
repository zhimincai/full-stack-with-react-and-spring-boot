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
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    loginClicked () {
        if (this.state.username === "bbchai" && this.state.password === "0429"){
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.setState({loginStatus : 1})
            this.props.history.push(`/welcome/${this.state.username}`)
        }
        else{
            // console.log("fail")
            this.setState({loginStatus : 2})
        }
    }

    // general control states at once
    handleChange (event) {
        this.setState({ [event.target.name] : event.target.value })
    }
    
    // control state inside react
    // handleUsernameChange(event) {
    //     this.setState({ username : event.target.value })
    // }

    // handlePasswordChange(event) {
    //     this.setState({ password : event.target.value })
    // }

    render() {
        return (
            <div>
                <h2>Login</h2>
                
                <ShowCredentialStatus loginStatus={this.state.loginStatus}/>
                <div className='container'>
                    {/* <div>Please enter your username and password!</div> */}
                    {/* {<div className="alert alert-succesful" role='alert'>Invalid Credential!</div>} */}

                    <form onSubmit={this.loginClicked}>
                        User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                        Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        <button type="submit" className="btn">Login</button>
                    </form>

                    {/* <button type="submit" onClick={this.loginClicked}>login</button> */}
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