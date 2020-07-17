import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import moment from 'moment'
import AuthenticationService from './AuthenticationService.js'
import TodoDataService from '../../api/todo/TodoDataService.js'

class UpdateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: Number(this.props.match.params.id),
            description: 'description.',
            complete: false,
            targetDate: moment(new Date()).format('YYYY-MM-DD'),
            note: 'no thing new here...',
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
        TodoDataService.getTodo(username, this.state.id)
            .then(response => { 
                console.log(response.data);
                this.setState({
                                            description: response.data.description,
                                            complete: Boolean(response.data.complete),
                                            targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
                                            note: response.data.note,
            })})
            console.log(this.state);
    }
    
    onSubmit(value) {
        let username = AuthenticationService.getUserLoggedIn()
        value.username = username
        value.id = this.state.id
        if (this.state.id === -1) {
            TodoDataService.createTodo(username, value)
            .then(response => {this.props.history.push('/todos')})
            .catch(error => {this.handleError(error)})
        } else {
            TodoDataService.updateTodo(username, this.state.id, value)
            .then(response => {this.props.history.push('/todos')})
            .catch(error => {this.handleError(error)})
        }
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

    validate(values) {
        let errors = {}

        if (!values.description) {
            errors.description = "Please enter your Todo's description."
        } else if (values.description.length < 5) {
            errors.description = "Please enter more than 5 charaters description."
        }

        if (!moment(values.targetDate).isValid()){
            errors.targetDate = "Please select a valid date for accomplishing your target."
        }
        return errors
    }

    render() {
        let {id, description, targetDate, complete, note} = this.state
        return (
            <div>
                {id >= 0 && <h3> Update Todo [{id}]</h3>}
                {id === -1 && <h3> Create Todo</h3>}
                {this.state.errorMessage && <div className='alert alert-warning'>{this.state.errorMessage}</div>}
                <div className='container'>
                    <Formik 
                        initialValues={{description, targetDate, complete, note}}
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
                                        <ErrorMessage name="description" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="targetDate" component='div' className='alert alert-warning'/>
                                        <ErrorMessage name="isCompleted" component='div' className='alert alert-warning'/>
                                    </div>
                                    <fieldset className='form-group'>
                                        <label className='font-weight-bold'>Description</label>
                                        <Field className='form-control' type='text' name="description" id='description'/>
                                        <small className="form-text text-muted text-centers">Describe what you will accomplish in here.</small>
                                    </fieldset>

                                    <div className='form-row'>
                                        <fieldset className='form-group col-md-6'>
                                            <label className='font-weight-bold'>Target Date</label>
                                            <Field className='form-control' type='date' name='targetDate'/>
                                        </fieldset>
                                        <fieldset className='form-group col-md-6'>
                                            <label className='font-weight-bold'>Is Completed?</label>
                                            <Field className='form-control'  as="select" name="complete" placeholder='Please select the status.'>
                                                <option value="true">Yes.</option>
                                                <option value="false">Still working on it.</option>
                                            </Field>
                                        </fieldset>
                                    </div>

                                    <fieldset className='form-group'>
                                        <label className='font-weight-bold'>Note</label>
                                        <Field className='form-control' type='text' name='note'/>
                                        <small className="form-text text-muted">Take notes about your plans, your timelines, and everything else.</small>
                                    </fieldset>
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

export default UpdateComponent