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
public class ShiftJpaResource {
	
	@Autowired
	private ShiftJpaRepository shiftJpaRepository;

	@GetMapping(path="/users/{username}/shifts")
	public List<Shift> getAllEmployees(@PathVariable String username){
		return shiftJpaRepository.findByUsername(username);
	}
	
	@GetMapping(path="/users/{username}/shifts/{id}")
	public Shift getEmployee(@PathVariable String username, @PathVariable long id){
		return shiftJpaRepository.findById(id).get();

	}
	
	@PutMapping(path="/users/{username}/shifts/{id}")
	public ResponseEntity<Shift> updateShift(@PathVariable String username, @PathVariable long id, @RequestBody Shift shift){
		shift.setUsername(username);
		Shift updatedShift = shiftJpaRepository.save(shift);
		return new ResponseEntity<Shift>(updatedShift, HttpStatus.OK);
	}

	@PostMapping(path="/users/{username}/shifts")
	public ResponseEntity<Void> createShift(@PathVariable String username, @RequestBody Shift shift){
		shift.setUsername(username);
		Shift createdShift = shiftJpaRepository.save(shift);
		
		// make the new uri available to return
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdShift.getId()).toUri();
		
		// return void ResponseEntity with HttpStatus.CREATED
		return ResponseEntity.created(uri).build();
	}
	
	@DeleteMapping(path="/users/{username}/shifts/{id}")
	public ResponseEntity<Void> deleteShift(@PathVariable String username, @PathVariable long id){
		shiftJpaRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
