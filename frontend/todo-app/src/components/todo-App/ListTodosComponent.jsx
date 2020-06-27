import React, {Component} from 'react';

class ListTodosComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            todos : [
                    {id: 1, description: 'todo 1', isCompleted: true, other: new Date()},
                    {id: 2, description: 'todo 2', isCompleted: false, other: new Date()},
                    {id: 3, description: 'todo 3', isCompleted: true, other: new Date()}
                    ]
        }
    }
    render () {
        return <div>
                    <h2>List of Todos</h2>
                    <table className="table table-striped table-bordered table-hover table-sm">
                        <thead className="thead-light">
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Is Completed?</th>
                                <th>Other</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        {/* <td>{todo.isCompleted}</td> */}
                                        <td><StatusComponent isCompleted = {todo.isCompleted} /></td>
                                        <td>{todo.other.toString()}</td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
    }
}
function StatusComponent (props) {
    if (props.isCompleted)
        return <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUGc2FLh7VKR_AAzrukRd_QvI07IbsIhOG2uRJnamwxuy_cRZq&usqp=CAU' alt="Yes" width="20" height="20"></img>
    else
        return <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQbhkd7ClFrxCmnOUfGks0PAtSOOjike3k0Fhoxs6u4AWZpgprK&usqp=CAU' alt="No" width="20" height="20"></img>
}

export default ListTodosComponent