package com.todoapp.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHardcodedService {
	
	
	private static List<Todo> todos = new ArrayList<Todo>();
	private static int idCounter = 0;
	
	static {
		todos.add(new Todo(++idCounter, "bbchai", "learn To Feed Baby", true, new Date(), "..."));
		todos.add(new Todo(++idCounter, "bbchai", "learn To Change Diaper", false, new Date(), "..."));
		todos.add(new Todo(++idCounter, "bbchai", "learn To Be Chilled", false, new Date(), "..."));
	}
	
	public List<Todo> findAll() {
		return todos;
	}
	
	public Todo deleteById(long id) {
		Todo target = findById(id);
		
		if (target == null) return null;
		
		if (todos.remove(target)) {
			return target;
		}
		return null;
	}

	protected Todo findById(long id) {
		Todo target = null;
		for(Todo todo: todos) {
			if(todo.getId() == id) {
				target = todo;
				break;
			}
		}
		return target;
	}
	
	public Todo updateTodo(Todo todo) {
		if (todo.getId() == -1 || todo.getId() == 0) {
			todo.setId(++idCounter);
		} else {
			// remove old todo first			
			deleteById(todo.getId());
		}
		todos.add(todo);
		return todo;
	}
}
