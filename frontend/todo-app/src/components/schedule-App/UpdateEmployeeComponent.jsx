import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import moment from 'moment'
import AuthenticationService from '../todo-App/AuthenticationService.js'
import EmployeeDataService from '../../api/schedule/EmployeeDataService.js'
import AvailibilityDataService from '../../api/schedule/AvailibilityDataService.js'

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: Number(this.props.match.params.id),
            employeeName: 'name',
            position: 'Barista',
            level: '0',
            startDate: moment(new Date()).format('YYYY-MM-DD'),
            shiftLimitWeekly: '0',
            avMon: -1,
            avTue: -1,
            avWed: -1,
            avThur: -1,
            avFri: -1,
            avSat: -1,
            avSun: -1,
            errorMessage:''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return
        }
        let username = AuthenticationService.getUserLoggedIn()
        EmployeeDataService.getEmployee(username, this.state.id)
            .then(response => { 
                this.setState({
                                employeeName: response.data.employeeName,
                                position: response.data.position,
                                level: response.data.level,
                                startDate: moment(response.data.startDate).format('YYYY-MM-DD'),
                                shiftLimitWeekly: response.data.shiftLimitWeekly
            })})

        AvailibilityDataService.getAvailibility(username, this.state.id)
            .then(response => { 
                this.setState({
                                avMon: response.data.avMon,
                                avTue: response.data.avTue,
                                avWed: response.data.avWed,
                                avThur: response.data.avThur,
                                avFri: response.data.avFri,
                                avSat: response.data.avSat,
                                avSun: response.data.avSun
            })})
    }
    
    onSubmit(value) {
        let username = AuthenticationService.getUserLoggedIn()
        let employee = {
                            username: username,
                            id: this.state.id,
                            employeeName: value.employeeName,
                            position: value.position,
                            level: value.level,
                            startDate: moment(value.startDate).format('YYYY-MM-DD'),
                            shiftLimitWeekly: value.shiftLimitWeekly
        }
        var av = {
                    username: username,
                    id: this.state.id,
                    avMon: value.avMon,
                    avTue: value.avTue,
                    avWed: value.avWed,
                    avThur: value.avThur,
                    avFri: value.avFri,
                    avSat: value.avSat,
                    avSun: value.avSun
        }

        if (this.state.id === -1) {
            EmployeeDataService.createEmployee(username, employee)
                .then(response => {
                    // use same id return from employee create for matching
                    av.id = response.data

                    AvailibilityDataService.createAvailibility(username, av)
                        .then(response => {this.props.history.push('/employees')})
                        .catch(error => {this.handleError(error)})
                })
                .catch(error => {this.handleError(error)})

        } else {
            EmployeeDataService.updateEmployee(username, this.state.id, employee)
                .then( () => {
                    AvailibilityDataService.updateAvailibility(username, this.state.id, av)
                    .then(response => {this.props.history.push('/employees')})
                    .catch(error => {this.handleError(error)})
                })
                .catch(error => {this.handleError(error)})

        }
    }

    validate(values) {
        let errors = {}

        if (!values.employeeName) {
            errors.employeeName = "Employee's name is required."
        } else if (values.employeeName.length > 20) {
            errors.employeeName = "Please enter less than 20 charaters name."
        }

        if (!values.startDate) {
            errors.startDate = "Employee's Start-Date is required."
        } else if (!moment(values.startDate).isValid()){
            errors.startDate = "Please select a valid date for start date."
        }

        var pos = ['Manager', 'Barista', 'Cook', 'Clean']
        if (!values.position) {
            errors.position = "Employee's Position is required."
        } else if (pos.indexOf(values.position) === -1) {
            errors.position = "Please enter a valid position."
        }

        if (!values.level && values.level !== 0) {
            errors.level = "Employee's Level is required."
        } else if (0 > values.level || values.level > 4) {
            errors.level = "Please enter a valid level."
        }

        if (!values.shiftLimitWeekly && values.shiftLimitWeekly !== 0) {
            errors.shiftLimitWeekly = "Shift-Limit-Weekly is required."
        } else if (0 > values.shiftLimitWeekly || values.shiftLimitWeekly >= 7) {
            errors.shiftLimitWeekly = "Please enter a valid shift-Limit-Weekly (0 - 7)."
        }

        var senior_shift = [0, 1, 4, 5]
        var shot_shift = [0, 4]
        var avs = [values.avMon, values.avTue, values.avWed, values.avThur, values.avFri, values.avSat, values.avSun]
        var av_invalid = false

        var min_av = -1, max_av = 6, i
        for (i in avs) {
            if (avs[i] === '' || avs[i] < min_av || avs[i] > max_av) {
                av_invalid = !av_invalid
                break
            }
        }

        if (!errors.level){ // Only consider these when level is valid
            var invalid_overlap
            if (av_invalid) {
                errors.avMon = "Please select shift numbers within valid range."
            }
            else if (values.level <= 1) {
                invalid_overlap = avs.filter(av => senior_shift.indexOf(Number(av)) >= 0)
    
                if (invalid_overlap.length > 0) {
                    errors.avMon = "Please select a valid shift(junior / register) according to the level."
                }
            } 
            else if (values.level <= 2) {
                invalid_overlap = avs.filter(av => shot_shift.indexOf(Number(av)) >= 0)
                if (invalid_overlap.length > 0) {
                    errors.avMon = "Please select a valid shift(milk / junior / register) according to the level."
                }
            }
            else if (values.level <= 3) {
                invalid_overlap = avs.filter(av => Number(av) !== 0)
                if (invalid_overlap.length > 0) {
                    errors.avMon = "Please select a valid shift(excluding openning shift) according to the level."
                }
            }
        }

        // console.log(errors)
        
        return errors
    }

    handleError(error) {
        let message = ''
        if (error.message) {
            message += error.message
        }
        if (error.response && error.response.data) {
            message += error.response.data.message
        }

        this.setState({errorMessage: message})
    }

    render() {
        let {id, employeeName, position, level, startDate, shiftLimitWeekly, avMon, avFri, avSat
        , avSun, avThur, avTue, avWed} = this.state
        
        return (
            <div>
                
                {id >= 0 && <h3> Update Employee [{id}]</h3>}
                {id === -1 && <h3> Create Employee</h3>}
                {this.state.errorMessage && <div className='alert alert-warning'>{this.state.errorMessage}</div>}
                <div className='container'>
                    <Formik 
                        initialValues={{employeeName, position, level, startDate, shiftLimitWeekly, avMon, avFri, avSat
                            , avSun, avThur, avTue, avWed}}
                        onSubmit={this.onSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form className='text-left'>
                                    <div>
                                        <ErrorMessage name="employeeName" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="startDate" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="position" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="level" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="shiftLimitWeekly" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="avMon" component='div' className='alert alert-warning'/>
                                    </div>

                                    <div className='form-row'>
                                        <fieldset className='form-group col-md-6'>
                                            <label className='font-weight-bold'>Employee Name</label>
                                            <Field className='form-control' type='text' name="employeeName"/>
                                        </fieldset>

                                    <fieldset className='form-group col-md-6'>
                                            <label className='font-weight-bold'>Start Date</label>
                                            <Field className='form-control' type='date' name='startDate'/>
                                    </fieldset>
                                    </div>

                                    <div className='form-row'>
                                        <fieldset className='form-group col-md-6'>
                                            <label className='font-weight-bold'>Position</label>
                                            <Field className='form-control' type='text' name="position"/>
                                            <small className="form-text text-muted text-centers">Position: [Manager, Barista, Cook, Clean]</small>
                                        </fieldset>

                                        <fieldset className='form-group col-md-6'>
                                            <label className='font-weight-bold'>Level</label>
                                            <Field className='form-control' type='int' name="level"/>
                                            <small className="form-text text-muted text-centers">Level description: [4: opening / senior, 3: shot / senior, 2: milk / senior, 1: pourover / junior, 0: register / new]</small>
                                        </fieldset>

                                        <fieldset className='form-group col-md-6'>
                                            <label className='font-weight-bold'>Shift Limits Weekly</label>
                                            <Field className='form-control' type='int' name="shiftLimitWeekly"/>
                                            <small className="form-text text-muted text-centers">Please record here about number of shifts (0-7) the employee would like to take per week.</small>
                                        </fieldset>
                                    </div>

                                    <div className='form-row'>
                                        <fieldset className='form-group col-md-1'>
                                            <label className='font-weight-bold'>Monday</label>
                                            <Field className='form-control' type='int' name='avMon'/>
                                        </fieldset>
                                        
                                        <fieldset className='form-group col-md-1'>
                                            <label className='font-weight-bold'>Tuesday</label>
                                            <Field className='form-control' type='int' name='avTue'/>
                                        </fieldset>


                                        <fieldset className='form-group col-md-1'>
                                            <label className='font-weight-bold'>Wednesday</label>
                                            <Field className='form-control' type='int' name='avWed'/>
                                        </fieldset>

                                        <fieldset className='form-group col-md-1'>
                                            <label className='font-weight-bold'>Thurday</label>
                                            <Field className='form-control' type='int' name='avThur'/>
                                        </fieldset>
                                        
                                        <fieldset className='form-group col-md-1'>
                                            <label className='font-weight-bold'>Friday</label>
                                            <Field className='form-control' type='int' name='avFri'/>
                                        </fieldset>

                                        <fieldset className='form-group col-md-1'>
                                            <label className='font-weight-bold'>Saturday</label>
                                            <Field className='form-control' type='int' name='avSat'/>
                                        </fieldset>

                                        <fieldset className='form-group col-md-1'>
                                            <label className='font-weight-bold'>Sunday</label>
                                            <Field className='form-control' type='int' name='avSun'/>
                                        </fieldset>

                                        <small className="form-text text-muted text-centers">Shift: [0: opening / 6am-1pm, 1: milk-morning / 7am-2pm, 2: junior / 7am-2pm, 3: junior / 8am-3pm, 4: senior / 1pm-6pm, 5: milk / 2pm-7pm, 6: junior / 2pm-7pm]</small>
                                    </div>
                                    <button type="submit" className="btn btn-success">Update</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent