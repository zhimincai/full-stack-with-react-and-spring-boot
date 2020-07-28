import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {LEVELS, TIME_SLOT, DAY_OF_WEEK, POSITIONS} from '../../Constants'
import AuthenticationService from '../todo-App/AuthenticationService.js'
import ShiftDataService from '../../api/schedule/ShiftDataService.js'
import ScheduleDataService from '../../api/schedule/ScheduleDataService.js'
import SelectionComponent from './SelectionComponent'
import EmployeeDataService from '../../api/schedule/EmployeeDataService'

class UpdateShiftComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: Number(this.props.match.params.id),
            isCopy: Number(this.props.match.params.id) !== -1 && this.props.match.params.id.slice(-2,) === '-1',
            dayOfWeek: -1,
            position: '',
            level: '0',
            timeSlot: -1,
            assignedId: -1,
            description: 'Responsibilities description.',
            note: 'special note for the shift.',
            matchIds: [],
            matchEmployeeName: [],
            errorMessage: ''
        }
        if (this.state.isCopy) {
            this.state.id = this.props.match.params.id.slice(0,-2)
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleError = this.handleError.bind(this)
        this.getUpdatedAssignedAndMatches = this.getUpdatedAssignedAndMatches.bind(this)
        this.getMatches = this.getMatches.bind(this)
        this.reAssign = this.reAssign.bind(this)

        console.log('constructor ', this.state.id, this.state.isCopy,Number(this.props.match.params.id) !== -1, this.props.match.params.id.slice(-2,), this.props.match.params.id.slice(0,-2))
        
    }

    componentDidMount() {

        console.log('componentDidMount')
        if (this.state.id === -1) {
            return
        }
        let username = AuthenticationService.getUserLoggedIn()

        ShiftDataService.getShift(username, this.state.id)
            .then(response => { 
                if (this.state.isCopy) {
                    this.setState({ dayOfWeek: response.data.dayOfWeek,
                                    position: response.data.position,
                                    level: response.data.level,
                                    timeSlot: response.data.timeSlot,
                                    assignedId: -1,
                                    description: response.data.description,
                                    note: response.data.note})
                } else {
                    this.setState({ dayOfWeek: response.data.dayOfWeek,
                                    position: response.data.position,
                                    level: response.data.level,
                                    timeSlot: response.data.timeSlot,
                                    assignedId: response.data.assignedId,
                                    description: response.data.description,
                                    note: response.data.note})
                }
                this.getUpdatedAssignedAndMatches(username)
            })
            .catch(error => {this.handleError(error)})
    }

    getMatches(username, matchIds, matchEmployeeName) {
        
        ScheduleDataService.getMatchEmployeeList(username, this.state.id)
        .then(response => {
            if (response !== null && response.data !== null) {
                response.data.forEach(
                    element => {
                                    matchIds.push(element.id)
                                    matchEmployeeName.push(element.employeeName)
                });
                this.setState({matchIds, matchEmployeeName})
            }
        })
        .catch(error => {this.handleError(error)})
    }

    getUpdatedAssignedAndMatches(username) {

        let matchIds = [], matchEmployeeName = []

        if (this.state.assignedId !== -1) {
            EmployeeDataService.getEmployee(username, this.state.assignedId)
            .then(response =>{
                matchIds.push(this.state.assignedId)
                matchEmployeeName.push(response.data.employeeName)

                this.getMatches(username, matchIds, matchEmployeeName)
            })
            .catch(error => {this.handleError(error)})

        }else {
            this.getMatches(username, matchIds, matchEmployeeName)
        }
    }
    
    onSubmit(value) {

        console.log('onSubmit')
        let username = AuthenticationService.getUserLoggedIn()
        value.username = username

        value.id = this.state.id
        value.assignedId = this.state.assignedId

        if (this.state.isCopy) {
            value.id = -1
            value.assignedId = -1
            console.log('Is copy: ', -1)
        }

        let isLinkedChange = false
        if (value.dayOfWeek !== this.state.dayOfWeek || value.position !== this.state.position 
                || value.level !== this.state.level || value.timeSlot !== this.state.timeSlot ) {
            isLinkedChange = true
            value.assignedId = -1
        }

        console.log('onSubmit: ', value)

        if (value.id === -1) {
            console.log('create ')
            ShiftDataService.createShift(username, value)
                .then(response => {
                    //update generated_id from backend and value 
                    this.setState({ 
                        isCopy: false,
                        id: Number(response.data),
                        dayOfWeek: value.dayOfWeek,
                        position: value.position,
                        level: value.level,
                        timeSlot: value.timeSlot,
                        assignedId: value.assignedId,
                        description: value.description,
                        note: value.note})

                    //get new matches
                    if (isLinkedChange) {
                        this.getUpdatedAssignedAndMatches(username)
                    }

                    console.log('create complete', this.state, response.data)
                })
                .catch(error => {this.handleError(error)})

        } else {
            ShiftDataService.updateShift(username, value.id, value)
                .then( response => {
                    //update values
                    this.setState({ 
                        dayOfWeek: response.data.dayOfWeek,
                        position: response.data.position,
                        level: response.data.level,
                        timeSlot: response.data.timeSlot,
                        assignedId: response.data.assignedId,
                        description: response.data.description,
                        note: response.data.note})
                    //get new matches
                    if (isLinkedChange) {
                        this.getUpdatedAssignedAndMatches(username)
                    }
                })
                .catch(error => {this.handleError(error)})
        }
    }

    validate(values) {
        console.log(values)
        let errors = {}

        if (Object.keys(TIME_SLOT).indexOf(String(values.timeSlot)) === -1) {
            errors.timeSlot = "Please select a valid time slot." +  String(values.timeSlot)
        }

        if (Object.keys(DAY_OF_WEEK).indexOf(String(values.dayOfWeek)) === -1){
            errors.dayOfWeek = "Please select a valid day of week." + String(values.dayOfWeek)
        }

        if (!values.position) {
            errors.position = "Shift's Position is required."
        } else if (POSITIONS.indexOf(values.position) === -1) {
            errors.position = "Please select a valid position."
        }

        if (0 > values.level || values.level >= LEVELS.length) {
            errors.level = "Please select a valid level."
        }

        if (values.note && values.note.length > 300) {
            errors.note = "Please enter less than 300 charaters note."
        }

        if (!values.description) {
            errors.description = "Shift's decription is required."
        } else if (values.description.length > 500) {
            errors.description = "Please enter less than 500 charaters decription."
        }

        // console.log(errors)
        
        return errors
    }

    handleError(error) {

        console.log(error.name, error.response)
        let message = ''
        if (error.message) {
            message += error.message + '.    \n'
        }
        if (error.response && error.response.data) {
            message += error.response.data.message
        }

        this.setState({errorMessage: message})
    }

    reAssign (event) {
        let username = AuthenticationService.getUserLoggedIn()

        if (this.state.id === -1) {
            this.setState({errorMessage: "Please save shift's data first."})
        } else {
            console.log('new assigned e id: ')
            console.log( event.target.value + ', shift_id: ' + this.state.id)
            // change the shift's assigned-employee-Id
            ShiftDataService.assignNewEmployee(username, this.state.id, event.target.value)
                .then(response => {
                    this.setState({assignedId: response.data.assignedId})
                    console.log('new assignment is completed ', this.state.assignedId)
                })
                .catch( error => {this.handleError(error)} )
        }
    }

    render() {
        console.log('render')
        let {id, dayOfWeek, position, level, timeSlot, description, note} = this.state

        return (
            <div>
                
                {id >= 0 && <h3> Update Shift [{id}]</h3>}
                {id === -1 && <h3> Create Shift</h3>}

                {this.state.errorMessage && <div className='alert alert-warning'>{this.state.errorMessage}</div>}

                <div className='container justify-content-center text-monospace mb-5'>
                    <Formik 
                        initialValues={{ dayOfWeek, position, level, timeSlot, description, note}}
                        onSubmit={this.onSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form className='text-left' >
                                    <div>
                                        <ErrorMessage name="dayOfWeek" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="timeSlot" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="position" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="level" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="description" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="note" component='div' className='alert alert-warning'/>
                                    </div>

                                    <div className='form-row'>
                                        <SelectionComponent label='Time Slot' type="int" name='timeSlot' init={-1} selections={TIME_SLOT} 
                                                                idxs={[...Array(7).keys()] } width_className='col-md-5'/>

                                        <SelectionComponent label='Day Of Week' type="int" name='dayOfWeek' init={-1} selections={DAY_OF_WEEK} 
                                                                idxs={[...Array(8).keys()].slice(1,)} width_className='col-md-5'/>
                                    </div>

                                    <div className='form-row'>
                                        <SelectionComponent label='Position' type="text" name='position' init='' selections={POSITIONS} 
                                                                idxs={[...Array(4).keys()]} width_className='col-md-5' optionValues="original"/>

                                        <SelectionComponent label='Minimal Required Level' type="int" name='level' init={-1} selections={LEVELS} 
                                                                idxs={[...Array(5).keys()]} width_className='col-md-5'/>

                                    </div>

                                    <div className='form-row'>
                                        <fieldset className='form-group col-md-10'>
                                            <label className='font-weight-bold'>Description</label>
                                            <Field className='form-control' component='textarea' rows={3} type='textarea' name="description"/>
                                            <small className="form-text text-muted text-centers">Please Describe Responsibilities about the position here.</small>
                                        </fieldset>
                                    </div>

                                    <div className='form-row'>
                                    <fieldset className='form-group col-md-10'>
                                            <label className='font-weight-bold'>Note</label>
                                            <Field className='form-control' component='textarea' rows={3} type='textarea' name='note'/>
                                            <small className="form-text text-muted text-centers">For Special Instructions.</small>
                                    </fieldset>
                                    </div>

                                    <div className='form-row  justify-content-center'>
                                        <button type="submit" className="btn btn-warning">Save</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>

                
                <div className="card col-md-5 container bg-warning">
                    <div className="card-header bg-white  text-warning text-center">
                        Please Save Above Changes to Load the Updated Match Employees.
                    </div>
                    <div className="card-body ">
                        <select className="form-control" value={this.state.assignedId} defaultValue={-1} onChange={(event) => this.reAssign(event)}>
                            <option value={-1}>---- Please Select... ----</option>
                            {this.state.matchEmployeeName.map(
                                    (name, i) => <option value={this.state.matchIds[i]} key={i} >{name}</option>)
                            }
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateShiftComponent