package com.todoapp.webservices.restfulwebservices.schedule;

import java.net.URI;
import java.util.List;
import java.util.Optional;

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
public class AvailibilityJpaResource {
	
	@Autowired
	private AvailibilityWeeklyJpaRepository availibilityWeeklyJpaRepository;

	@GetMapping(path="/users/{username}/availibilities")
	public List<AvailibilityWeekly> getAllEmployees(@PathVariable String username){
		return availibilityWeeklyJpaRepository.findByUsername(username);
	}
	
	@GetMapping(path="/users/{username}/availibilities/{id}")
	public AvailibilityWeekly getEmployee(@PathVariable String username, @PathVariable long id){
		return availibilityWeeklyJpaRepository.findById(id).get();

	}
	
	@PutMapping(path="/users/{username}/availibilities/{id}")
	public ResponseEntity<AvailibilityWeekly> updateAvailibilityWeekly(@PathVariable String username, @PathVariable long id, @RequestBody AvailibilityWeekly availibilityWeekly){
		availibilityWeekly.setUsername(username);
		AvailibilityWeekly updatedAvailibilityWeekly = availibilityWeeklyJpaRepository.save(availibilityWeekly);
		return new ResponseEntity<AvailibilityWeekly>(updatedAvailibilityWeekly, HttpStatus.OK);
	}

	@PostMapping(path="/users/{username}/availibilities")
	public ResponseEntity<Void> createAvailibilityWeekle(@PathVariable String username, @RequestBody AvailibilityWeekly availibilityWeekly){
		availibilityWeekly.setUsername(username);
		AvailibilityWeekly createdAvailibilityWeekly = availibilityWeeklyJpaRepository.save(availibilityWeekly);
		
		// make the new uri available to return
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdAvailibilityWeekly.getId()).toUri();
		
		// return void ResponseEntity with HttpStatus.CREATED
		return ResponseEntity.created(uri).build();
	}
	
	@DeleteMapping(path="/users/{username}/availibilities/{id}")
	public ResponseEntity<Void> deleteAvailibilityWeekle(@PathVariable String username, @PathVariable long id){
		availibilityWeeklyJpaRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
