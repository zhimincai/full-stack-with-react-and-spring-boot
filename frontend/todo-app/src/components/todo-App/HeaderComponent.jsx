import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'

class HeaderComponent extends Component {
    render () {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        return (<header>
                    <h1>Todo App</h1> 
                    <div className='font-italic font-weight-lighter'>Aim to help you organizing tasks nicely.</div>
                    <nav className="navbar navbar-expand-md  text-white bg-secondary">
                        <div>
                            <a className="navbar-brand text-info" href='/'><img src='https://www.clker.com/cliparts/Z/E/c/1/z/X/icon-hause-gray-md.png' width = '40' height='40' alt='Home Icon'></img>Home</a>
                        </div>
                        {isUserLoggedIn &&
                            <ul className="navbar-nav">
                                <li>
                                    <Link to={`/welcome/${AuthenticationService.getUserLoggedIn()}`} className='nav-link text-white'>Welcome</Link>
                                </li>
                                <li>
                                    <Link to='/todos' className='nav-link text-white'>Todos</Link>
                                </li>
                                <li>
                                    <Link to={`/employees`} className='nav-link text-white'>Employees</Link>
                                </li>
                                <li>
                                    <Link to={`/schedule`} className='nav-link text-white'>Schedule</Link>
                                </li>
                            </ul>
                        }
                        <ul className='navbar-nav navbar-collapse justify-content-end'>
                            {!isUserLoggedIn &&
                                <li>
                                    <Link to='/login' className='nav-link text-white'>Login</Link>
                                </li>
                            }
                            {isUserLoggedIn &&
                                <li>
                                    <Link to='/logout' className='nav-link text-white' onClick={AuthenticationService.logout}>Logout</Link>
                                </li>
                            }
                        </ul>
                    </nav>
                    
                    <hr/>
                </header>)
    }
}

export default withRouter(HeaderComponent)