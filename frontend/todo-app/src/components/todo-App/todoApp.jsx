import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'
import LoginComponent from './LoginComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import FooterComponent from './FooterComponent'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponen'
import LogoutComponent from './LogoutComponent'
import UpdateComponent from './UpdateComponent'
import ListEmployeesComponent from '../schedule-App/ListEmployeesComponent'
import UpdateEmployeeComponent from '../schedule-App/UpdateEmployeeComponent'

class TodoApp extends Component {
    render () {
        return (
            <div className='todoApp'>
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/todos"  exact component={ListTodosComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component={UpdateComponent}/>
                            <AuthenticatedRoute path="/employees/:id" component={UpdateEmployeeComponent}/>
                            <AuthenticatedRoute path="/employees" component={ListEmployeesComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
                {/* <LoginComponent/>
                <WelcomeComponent/> */}
            </div>
        )
    }
}

export default TodoApp