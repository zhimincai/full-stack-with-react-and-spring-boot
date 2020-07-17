package com.todoapp.webservices.restfulwebservices.schedule;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class EmployeeJpaResource {
	
	@Autowired
	private EmployeeJpaRepository employeeJpaRepository;

	@GetMapping(path="/users/{username}/employees")
	public List<Employee> getAllEmployees(@PathVariable String username){
		return employeeJpaRepository.findByUsername(username);
	}
	
	@GetMapping(path="/users/{username}/employees/{id}")
	public Employee getEmployee(@PathVariable String username, @PathVariable long id){
		return employeeJpaRepository.findById(id).get();

	}
	
	@PutMapping(path="/users/{username}/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable String username, @PathVariable long id, @RequestBody Employee employee){
		employee.setUsername(username);
		Employee updatedEmployee = employeeJpaRepository.save(employee);
		return new ResponseEntity<Employee>(updatedEmployee, HttpStatus.OK);
	}

	@PostMapping(path="/users/{username}/employees")
	public ResponseEntity<Long> createEmployee(@PathVariable String username, @RequestBody Employee employee){
		employee.setUsername(username);
		Employee createdEmployee = employeeJpaRepository.save(employee);
		
		// make the new uri available to return
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdEmployee.getId()).toUri();
		
		//return with Long Id
		return new ResponseEntity<Long>(createdEmployee.getId(), HttpStatus.CREATED);
		// return void ResponseEntity with HttpStatus.CREATED
//		return ResponseEntity.created(uri).build();
	}
	
	@DeleteMapping(path="/users/{username}/employees/{id}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable String username, @PathVariable long id){
		employeeJpaRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
