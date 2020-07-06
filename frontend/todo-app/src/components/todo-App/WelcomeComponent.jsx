import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {
    
    constructor (props) {
        super(props)
        this.state= {
            WelcomeMessage: '',
            ErrorMessage: ''
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulReponse = this.handleSuccessfulReponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render () {
            return <>
                        {this.state.ErrorMessage && 
                            <>
                                <div className='container alert alert-warning'>
                                    {this.state.ErrorMessage}
                                </div>

                                <div className='container'>
                                Click here to try it again.
                                <button onClick={() => this.retrieveWelcomeMessage(this.props.match.params.name)} className='btn btn-success'>Get Welcome Msg</button>
                                </div>
                            </>
                        }


                        {!this.state.ErrorMessage && 
                            <div className='container'>
                                    <div className='container'>
                                        {!this.state.WelcomeMessage && <div className="alert alert-success">Your account has been Logged in Succesfully!</div>}
                                        <img src="https://media1.giphy.com/media/26BRDSqaGfvWafqms/giphy.gif?cid=ecf05e47b62799232e77b8e541479d2a2e146b39ad808e8d&rid=giphy.gif" alt='success welcome'></img>
                                        <p><b>{this.state.WelcomeMessage}</b></p>
                                        You can manage your todos <Link to='/todos'>here</Link>.
                                    </div>
                                    {!this.state.WelcomeMessage && 
                                        <div className='container text-monospace'>
                                            <button onClick={() => this.retrieveWelcomeMessage(this.props.match.params.name)} className='btn btn-success'>Create Customized Welcome Message</button>
                                        </div>
                                    }
                            </div>
                        }
                    </>
    }

    retrieveWelcomeMessage(name) {
        HelloWorldService.executeHelloWorldPathVariableService(name)
        .then(response => this.handleSuccessfulReponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulReponse(response) {
        this.setState({WelcomeMessage: response.data.message})
    }

    handleError(error) {
        let message = '';
        // error might reflect on different layers
        if (error.message) {
            message += error.message
        }
        if (error.response && error.response.data) {
            message += error.response.data.message
        }

        console.log(message)
        this.setState({ErrorMessage: message})
    }
}

export default WelcomeComponent