import React, {Component} from 'react';
import EmployeeDataService from '../../api/schedule/EmployeeDataService.js'
import ShiftDataService from '../../api/schedule/ShiftDataService.js'
import ScheduleDataService from '../../api/schedule/ScheduleDataService.js'
import AuthenticationService from '../todo-App/AuthenticationService.js'
import {LEVELS, TIME_SLOT, DAY_OF_WEEK} from '../../Constants'

class ListShiftsComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            shifts_Mon: [],
            shifts_Tue: [],
            shifts_Wed: [],
            shifts_Thur: [],
            shifts_Fri: [],
            shifts_Sat: [],
            shifts_Sun: [],
            message: '',
            errorMessage: ''
        }
        this.getUpdatedData = this.getUpdatedData.bind(this)
        this.handleDeleteShift= this.handleDeleteShift.bind(this)
        this.handleUpdateShift = this.handleUpdateShift.bind(this)
        this.handleError = this.handleError.bind(this)
        this.getAssignedEmployeeName = this.getAssignedEmployeeName.bind(this)
        this.getTableBody = this.getTableBody.bind(this)
        this.getMatches = this.getMatches.bind(this)
        this.reAssign = this.reAssign.bind(this)
        this.handleSchedule = this.handleSchedule.bind(this)
        this.handleClearAll = this.handleClearAll.bind(this)
    }
    render () {
        return <div className="mx-md-3">
                    <h2>Schedule</h2>
                    {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                    {this.state.errorMessage && <div className='alert alert-warning'>{this.state.errorMessage}</div>}
                    <div className='text-left'>Username: {AuthenticationService.getUserLoggedIn()}</div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button type='button' className='btn btn-outline-info' onClick={this.handleSchedule}>Schedule</button>
                        </div>
                        <button type='button' className='btn btn-outline-danger' onClick={this.handleClearAll}>Clear All</button>
                    </div>
                    <table className="table table-striped table-bordered table-hover table-sm">
                        <thead className="thead-light">
                            <tr>
                                <th>Day</th>
                                <th>Id</th>
                                <th>Position</th>
                                <th>Level</th>
                                <th>Time Slot</th>
                                <th>Assignment</th>
                                <th>Note</th>
                                <th>Update</th>
                                <th>Delete?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getTableBody()}
                        </tbody>
                    </table>
                    <div className='text-monospace'>
                    <button className='btn btn-success' onClick={() => this.handleUpdateShift(-1)}>Create New Shift</button>
                    </div>
                </div>
    }

    handleSchedule() {
        let username = AuthenticationService.getUserLoggedIn()
        ScheduleDataService.getScheduledShiftList(username)
            .then(response => {
                this.getUpdatedData(username)})
            .catch( error => {this.handleError(error)} )
    }

    handleClearAll() {
        let username = AuthenticationService.getUserLoggedIn()
        ScheduleDataService.clearSchedule(username)
            .then(response => {
                this.getUpdatedData(username)})
            .catch( error => {this.handleError(error)} )
    }

    getTableBody() {
        var shift_of_day = [this.state.shifts_Mon, this.state.shifts_Tue, this.state.shifts_Wed, this.state.shifts_Thur
                        , this.state.shifts_Fri, this.state.shifts_Sat, this.state.shifts_Sun];
        return shift_of_day.map(
                    (shifts, idx) => 
                        shifts.map(
                            (shift, i) =>
                                <tr key={shift.id}>
                                    {i === 0 && <th rowSpan={shifts.length} className="text-info align-middle"> {DAY_OF_WEEK[idx + 1]}</th>}
                                    <td>{shift.id}</td>
                                    <td>{shift.position}</td>
                                    <td>{LEVELS[shift.level]}</td>
                                    <td>{TIME_SLOT[shift.timeSlot]}</td>
                                    <td>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                {this.getAssignedEmployeeName(shift.assignedId, idx, i)}
                                            </div>
                                            {this.getMatches(shift.id, idx, i)}
                                        </div>
                                    </td>
                                    <td>{shift.note}</td>
                                    <td><button className='btn-sm btn-outline-secondary' onClick={() => this.handleUpdateShift(shift.id)}>Update</button></td>
                                    <td><button className='btn-sm btn-outline-warning' onClick={() => this.handleDeleteShift(shift.id)}>Delete</button></td>
                                </tr>
                        )
                            
                )
    }

    getAssignedEmployeeName (e_id, i, j) {
        let username = AuthenticationService.getUserLoggedIn()
        if (e_id >= 0) {
            EmployeeDataService.getEmployee(username, e_id)
                .then(response => {
                    if (response !== null && response.data !== null){
                        document.getElementById(i +'-'+ j).innerText = response.data.employeeName
                    }
                })
                .catch(error => {this.handleError(error)})
        }
        return <button type="button" className="btn btn-outline-secondary" id = {i +'-'+ j} selected>{e_id}</button>
    }

    getMatches (shift_id, i, j) {
        let username = AuthenticationService.getUserLoggedIn()
        if (shift_id >= 0) {
            ScheduleDataService.getMatchEmployeeList(username, shift_id)
                .then(response => {
                    if (response !== null && response.data !== null){
                        var selections = "<option value='dummy'>X</option>"
                        response.data.map(
                            e => {
                                selections += `<option value=${e.id}>${e.employeeName}</option>`
                            }
                        )
                        selections += "<option value=-1>Clear Assignment</option>"
                        
                        document.getElementById(i +'/'+ j).innerHTML = selections
                    }
                })
                .catch(error => {this.handleError(error)})
        }
        return  <select value='X' onChange={(event) => this.reAssign(event, shift_id)} className="btn btn-outline-secondary col-2" id={i +'/'+ j} aria-describedby={i +'-'+ j}>
                    {shift_id}
                </select>
    }

    reAssign (event, shift_id) {
        if (event.target.value === 'dummy') {
            return
        }

        let username = AuthenticationService.getUserLoggedIn()

        console.log('new assigned e id: ' + event.target.value)
        // change the shift's assigned-employee-Id
        ShiftDataService.assignNewEmployee(username, shift_id, event.target.value)
            .then(response => {
                this.getUpdatedData(username)})
            .catch( error => {this.handleError(error)} )
    }

    handleUpdateShift(id) {
        this.props.history.push(`/shifts/${id}`)
    }

    handleDeleteShift(id) {
        let username = AuthenticationService.getUserLoggedIn()

        ShiftDataService.deleteShift(username, id)
            .then( response => {    this.getUpdatedData(username);
                this.setState({message: `Delete Shift ${id} successfully. `}) })
            .catch( error => {this.handleError(error)} )
    }

    getUpdatedData(username) {
        ShiftDataService.getShiftListOfDay(username, 1)
            .then( response => { this.setState({shifts_Mon: response.data}) } )
            .catch( error => {this.handleError(error)} )
        
        ShiftDataService.getShiftListOfDay(username, 2)
            .then( response => { this.setState({shifts_Tue: response.data}) } )
            .catch( error => {this.handleError(error)} )

        ShiftDataService.getShiftListOfDay(username, 3)
            .then( response => { this.setState({shifts_Wed: response.data}) } )
            .catch( error => {this.handleError(error)} )

        ShiftDataService.getShiftListOfDay(username, 4)
            .then( response => { this.setState({shifts_Thur: response.data}) } )
            .catch( error => {this.handleError(error)} )

        ShiftDataService.getShiftListOfDay(username, 5)
            .then( response => { this.setState({shifts_May: response.data}) } )
            .catch( error => {this.handleError(error)} )

        ShiftDataService.getShiftListOfDay(username, 6)
            .then( response => { this.setState({shifts_Sat: response.data}) } )
            .catch( error => {this.handleError(error)} )

        ShiftDataService.getShiftListOfDay(username, 7)
            .then( response => { this.setState({shifts_Sun: response.data}) } )
            .catch( error => {this.handleError(error)} )
        console.log('get updated data....')
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

}

export default ListShiftsComponent