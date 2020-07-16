import React, {Component} from 'react';
import EmployeeDataService from '../../api/schedule/EmployeeDataService.js'
import AvailibilityDataService from '../../api/schedule/AvailibilityDataService.js'
import AuthenticationService from '../todo-App/AuthenticationService.js'
import moment from 'moment'

class ListEmployeesComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            employees: [],
            avalibility: [],
            message: '',
            errorMessage: ''
        }
        this.getUpdatedData = this.getUpdatedData.bind(this)
        this.AvailibilityComponent = this.AvailibilityComponent.bind(this)
        this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this)
        this.handleUpdateEmployee = this.handleUpdateEmployee.bind(this)
        this.handleError = this.handleError.bind(this)
    }
    render () {
        return <div className="mx-md-3">
                    <h2>Employees</h2>
                    {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                    {this.state.errorMessage && <div className='alert alert-warning'>{this.state.errorMessage}</div>}
                    <div className='text-left'>Username: {AuthenticationService.getUserLoggedIn()}</div>
                    <table className="table table-striped table-bordered table-hover table-sm">
                        <thead className="thead-light">
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Level</th>
                                <th>Start Date</th>
                                <th>Shift Limit Weekly</th>
                                <th>Avalibility Weekly</th>
                                <th>Update</th>
                                <th>Delete?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map(
                                (employee, idx) =>
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.employeeName}</td>
                                        <td>{employee.position}</td>
                                        <td>{employee.level}</td>
                                        <td>{moment(employee.startDate).format('MM-DD-YYYY').toString()}</td>
                                        <td>{employee.shiftLimitWeekly}</td>
                                        <td>{this.AvailibilityComponent(idx)}</td>
                                        <td><button className='btn btn-success' onClick={() => this.handleUpdateEmployee(employee.id)}>Update</button></td>
                                        <td><button className='btn btn-warning' onClick={() => this.handleDeleteEmployee(employee.id)}>Delete</button></td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                    <div className='text-monospace'>
                    <button className='btn btn-success' onClick={() => this.handleUpdateEmployee(-1)}>Create New Employee</button>
                    </div>
                </div>
    }


    handleUpdateEmployee(id) {
        console.log("update employee")
        this.props.history.push(`/employees/${id}`)
    }

    handleDeleteEmployee(id) {
        let username = AuthenticationService.getUserLoggedIn()

        EmployeeDataService.deleteEmployee(username, id)
        .then( response => {    this.getUpdatedData(username);
                                this.setState({message: `Delete Employee ${id} successfully. `}) })
        .catch( error => {this.handleError(error)} )
    }

    getUpdatedData(username) {
        EmployeeDataService.getEmployeeList(username)
        .then( response => { this.setState({employees: response.data.sort((a, b) => a.id - b.id)}) } )
        .catch( error => {this.handleError(error)} )

        AvailibilityDataService.getAvailibilityList(username)
        .then( response => {this.setState({avalibility: response.data.sort((a, b) => a.id - b.id)}) })
        .catch( error => {this.handleError(error)})
    }

    handleError(error) {
        //
        let message = this.state.message
        if (error.message) {
            message += error.message
        }
        if (error.response && error.response.data) {
            message += error.response.data.message
        }

        this.setState({errorMessage: message})
    }

    componentDidMount() {
        let username = AuthenticationService.getUserLoggedIn()
        this.getUpdatedData(username)
    }

    /*{
    // unmount when the componnent is unmounted(removed from current view)
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    // control if the component should update its view immediately or not after a state is updated
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps, nextState)
        return true
    }
    }*/

    AvailibilityComponent (idx) {
        console.log(this.state.avalibility[idx])
        let av = this.state.avalibility[idx]
        if (typeof(av) !== 'undefined')
            return <ul className="list-group list-group-horizontal-sm">
                        <li className="list-group-item flex-fill list-group-item-secondary">Mon <div>{av.avMon}</div></li>
                        <li className="list-group-item flex-fill bg-white text-dark">Tue <div>{av.avTue}</div></li>
                        <li className="list-group-item flex-fill list-group-item-secondary">Wed <div>{av.avWed}</div> </li>
                        <li className="list-group-item flex-fill bg-white text-dark">Thur <div>{av.avThur}</div></li>
                        <li className="list-group-item flex-fill list-group-item-secondary">Fri <div>{av.avFri}</div></li>
                        <li className="list-group-item flex-fill bg-white text-dark">Sat <div>{av.avSat}</div></li>
                        <li className="list-group-item flex-fill list-group-item-secondary">Sun <div>{av.avSun}</div></li>
                    </ul>
    }
}

export default ListEmployeesComponent