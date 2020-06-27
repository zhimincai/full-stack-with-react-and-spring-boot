import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class WelcomeComponent extends Component {
    render () {
        return  <div>
                    <div className="alert alert-success">Login Succesfully!</div>
                    <img src="https://media1.giphy.com/media/26BRDSqaGfvWafqms/giphy.gif?cid=ecf05e47b62799232e77b8e541479d2a2e146b39ad808e8d&rid=giphy.gif" alt='success welcome'></img>
                    <p>Welcome <b>{this.props.match.params.name}</b>!</p>
                    You can manage your todos <Link to='/todos'>here</Link>.
                </div>
    }
}

export default WelcomeComponent