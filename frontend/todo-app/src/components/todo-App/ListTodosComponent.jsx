import React, {Component} from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodosComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            todos: [],
            message: ''
        }
        this.getUpdatedTodoList = this.getUpdatedTodoList.bind(this)
        this.StatusComponent = this.StatusComponent.bind(this)
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
        this.handleUpdateTodo = this.handleUpdateTodo.bind(this)
    }
    render () {
        return <div className="mx-md-3">
                    <h2>Todo List</h2>
                    {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                    <div className='text-left'>Username: {AuthenticationService.getUserLoggedIn()}</div>
                    <table className="table table-striped table-bordered table-hover table-sm">
                        <thead className="thead-light">
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Is Completed?</th>
                                <th>Target Date</th>
                                <th>Note</th>
                                <th>Update</th>
                                <th>Delete?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todos.sort((a, b) => a.id - b.id).map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{moment(todo.targetDate).format('MM-DD-YYYY').toString()}</td>
                                        <td>{this.StatusComponent(todo.complete)}</td>
                                        <td className='text-wrap' >{todo.note}</td>
                                        <td><button className='btn btn-success' onClick={() => this.handleUpdateTodo(todo.id)}>Update</button></td>
                                        <td><button className='btn btn-warning' onClick={() => this.handleDeleteTodo(todo.id)}>Delete</button></td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                    <div className='text-monospace'>
                    <button className='btn btn-success' onClick={() => this.handleUpdateTodo(-1)}>Create New Todo</button>
                    </div>
                </div>
    }


    handleUpdateTodo(id) {
        this.props.history.push(`/todos/${id}`)
    }

    handleDeleteTodo(id) {
        let username = AuthenticationService.getUserLoggedIn()

        TodoDataService.deleteTodo(username, id)
        .then( response => {    this.getUpdatedTodoList(username);
                                this.setState({message: `Delete Todo ${id} successfully. `}) })
        .catch( error => {console.log(error)} )
    }

    getUpdatedTodoList(username) {
        TodoDataService.getTodoList(username)
        .then( response => { this.setState({todos: response.data}) } )
        .catch( error => {console.log(error.response)} )
    }

    componentDidMount() {
        let username = AuthenticationService.getUserLoggedIn()
        this.getUpdatedTodoList(username)
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

    StatusComponent (complete) {
        console.log(complete)
        if (complete)
            return <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUGc2FLh7VKR_AAzrukRd_QvI07IbsIhOG2uRJnamwxuy_cRZq&usqp=CAU' alt="Yes" width="20" height="20"></img>
        else
            return <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQbhkd7ClFrxCmnOUfGks0PAtSOOjike3k0Fhoxs6u4AWZpgprK&usqp=CAU' alt="No" width="20" height="20"></img>
    }
}

export default ListTodosComponent