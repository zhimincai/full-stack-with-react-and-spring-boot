import React, {Component} from 'react';
import EmployeeDataService from '../../api/schedule/EmployeeDataService.js'
import ShiftDataService from '../../api/schedule/ShiftDataService.js'
import ScheduleDataService from '../../api/schedule/ScheduleDataService.js'
import AuthenticationService from '../todo-App/AuthenticationService.js'
import {LEVELS, TIME_SLOT, DAY_OF_WEEK} from '../../Constants'
import PopComponent from './PopComponent'

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
            errorMessage: '',
        }

        this.getUpdatedData = this.getUpdatedData.bind(this)
        this.handleDeleteShift= this.handleDeleteShift.bind(this)
        this.handleUpdateShift = this.handleUpdateShift.bind(this)
        this.handleCopyShift = this.handleCopyShift.bind(this)
        this.handleError = this.handleError.bind(this)
        this.getAssignedEmployeeName = this.getAssignedEmployeeName.bind(this)
        this.getTableBody = this.getTableBody.bind(this)
        this.reAssign = this.reAssign.bind(this)
        this.handleSchedule = this.handleSchedule.bind(this)
        this.handleClearAll = this.handleClearAll.bind(this)
        this.showMatches = this.showMatches.bind(this)
    }
    
    render () {
        return <div className="mx-md-3">
                    <h2>Schedule</h2>
                    {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                    {this.state.errorMessage && <div className='alert alert-warning'>{this.state.errorMessage}</div>}
                    <div className='text-left'>Username: {AuthenticationService.getUserLoggedIn()}</div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button type='button' className='btn btn-outline-success' onClick={this.handleSchedule}>Schedule</button>
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
                                <th>Description</th>
                                <th>Note</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th>Copy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getTableBody()}
                        </tbody>
                    </table>
                    <div className='text-monospace'>
                    <button className='btn btn-outline-success' onClick={() => this.handleUpdateShift(-1)}>Create New Shift</button>
                    </div>
                </div>
    }

    handleSchedule() {
        let username = AuthenticationService.getUserLoggedIn()
        ScheduleDataService.getScheduledShiftList(username)
            .then(response => {
                this.getUpdatedData(username, true)})
            .catch( error => {this.handleError(error)} )
    }

    handleClearAll() {
        let username = AuthenticationService.getUserLoggedIn()
        ScheduleDataService.clearSchedule(username)
            .then(response => {
                this.getUpdatedData(username, true)})
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
                                            <div>
                                                <PopComponent color='outline-secondary' id={'matches-'+idx+'-'+i} title='Shift Matches:' body_func={this.showMatches} inputs={[shift.id, idx, i]}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td><PopComponent color='outline-info' id={'desc-'+idx+'-'+i} title='Shift Reponsibilities:' body={shift.description}/></td>
                                    <td>{shift.note}</td>
                                    <td><button className='btn-sm btn-outline-secondary' onClick={() => this.handleUpdateShift(shift.id)}>Update</button></td>
                                    <td><button className='btn-sm btn-outline-warning' onClick={() => this.handleDeleteShift(shift.id)}>Delete</button></td>
                                    <td><button className='btn-sm btn-outline-info' onClick={() => this.handleCopyShift(shift.id)}>Copy</button></td>
                                </tr>
                        )
                            
                )
    }

    getAssignedEmployeeName (e_id, i, j) {
        let username = AuthenticationService.getUserLoggedIn()
        let id = 'assigned-employee-name' + i +'-'+ j
        if (e_id >= 0) {
            EmployeeDataService.getEmployee(username, e_id)
                .then(response => {
                    if (response !== null && response.data !== null){
                        document.getElementById(id).innerText = response.data.employeeName
                    }
                })
                .catch(error => {this.handleError(error)})
            return <div className="btn btn-outline-dark" id = {id}>dummy</div>
        }
        else{
            return <div className="btn btn-outline-dark" id = {id}>---</div>
        }
    }

    showMatches (shift_id, i, j) {
        let username = AuthenticationService.getUserLoggedIn()
        let id = 'select-matches-' + i +'/'+ j
        if (shift_id >= 0) {

            ScheduleDataService.getMatchEmployeeList(username, shift_id)
                .then(response => {
                    if (response !== null && response.data !== null){
                        var selections = ""
                        response.data.map(
                            e => {
                                selections += `<button type='button' value=${e.id} class='btn btn-outline-info'>${e.employeeName}</button>`
                                return null
                            }
                        )
                        selections += "<button type='button' value=-1 class='btn btn-outline-warning'>Clear</button>"
                        
                        document.getElementById(id).innerHTML = selections
                    }
                })
                .catch(error => {this.handleError(error)})
        }

        return <div className='btn-group' onClick={(event) => this.reAssign(event, shift_id)} aria-label="Button-Group" id={id} role="group">...</div>
    }

    reAssign (event, shift_id) {
        let username = AuthenticationService.getUserLoggedIn()

        console.log('new assigned e id: ' + event.target.value + ', shift_id: ' + shift_id)
        // change the shift's assigned-employee-Id
        ShiftDataService.assignNewEmployee(username, shift_id, event.target.value)
            .then(response => {
                this.getUpdatedData(username, true)})
            .catch( error => {this.handleError(error)} )
    }

    handleUpdateShift(id) {
        this.props.history.push(`/shifts/${id}`)
    }

    handleCopyShift(id) {
        this.props.history.push(`/shifts/${id + '-1'}`)
    }

    handleDeleteShift(id) {
        let username = AuthenticationService.getUserLoggedIn()

        ShiftDataService.deleteShift(username, id)
            .then( response => {    
                this.getUpdatedData(username, true);
            })
            .catch( error => {this.handleError(error)} )
    }

    getUpdatedData(username, isModified) {
        ShiftDataService.getShiftListOfDays(username)
            .then( response => {
                // var shifts_Mon, shifts_Tue, shifts_Wed, shifts_Thur, shifts_Fri, shifts_Sat, shifts_Sun = response.data; 
                // this.setState({shifts_Mon, shifts_Tue, shifts_Wed, shifts_Thur, shifts_Fri, shifts_Sat, shifts_Sun});
                var message = ''
                if (isModified) {
                    message = 'Modified successfully. '
                } 
                this.setState({shifts_Mon: response.data[0], shifts_Tue: response.data[1], 
                                shifts_Wed: response.data[2], shifts_Thur: response.data[3], 
                                shifts_Fri: response.data[4], shifts_Sat: response.data[5], 
                                shifts_Sun: response.data[6], message: message});
                console.log('get updated data....', this.state)
            } )
            .catch( error => {this.handleError(error)})
    }

    handleError(error) {
        // get error from different layers
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
        this.getUpdatedData(username, false)
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