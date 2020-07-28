package com.todoapp.webservices.restfulwebservices.schedule;

import java.net.URI;
import java.util.ArrayList;
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
	
	@Autowired
	private EmployeeJpaRepository employeeJpaRepository;

	@GetMapping(path="/users/{username}/shifts")
	public List<Shift> getAllShifts(@PathVariable String username){
		return shiftJpaRepository.findByUsername(username);
	}
	
	@GetMapping(path="/users/{username}/shifts/days_of_week")
	public List<List<Shift>> getShiftsOfDays(@PathVariable String username){
		List<List<Shift>> result = new ArrayList<>();
		for (int day=1; day <= 7; day++) {
			result.add(shiftJpaRepository.findByDayOfWeekAndUsername(day, username));
		}
		return result;
	}
	
	@GetMapping(path="/users/{username}/shifts/{id}")
	public Shift getShift(@PathVariable String username, @PathVariable long id){
		return shiftJpaRepository.findById(id).get();
	}
	
	@PutMapping(path="/users/{username}/shifts/{id}")
	public ResponseEntity<Shift> updateShift(@PathVariable String username, @PathVariable long id, @RequestBody Shift shift){
		Shift old_shift = shiftJpaRepository.findById(id).get();
		
		shift.setUsername(username);
		Shift updatedShift = shiftJpaRepository.save(shift);
		
		if (old_shift.getAssignedId() != shift.getAssignedId()) {
			if (old_shift.getAssignedId() != -1) {
				Employee old_e = employeeJpaRepository.findById(old_shift.getAssignedId()).get();
				old_e.removeAssignedId(id);
				employeeJpaRepository.save(old_e);
			}
			
			if (shift.getAssignedId() != -1) {
				Employee new_e = employeeJpaRepository.findById(shift.getAssignedId()).get();
				new_e.addAssignedId(id);
				employeeJpaRepository.save(new_e);
			}
		}
		
		return new ResponseEntity<Shift>(updatedShift, HttpStatus.OK);
	}

	@PostMapping(path="/users/{username}/shifts")
	public ResponseEntity<Long> createShift(@PathVariable String username, @RequestBody Shift shift){
		shift.setUsername(username);
		System.out.println(shift);
		Shift createdShift = shiftJpaRepository.save(shift);

		System.out.println(createdShift);
		
		if (shift.getAssignedId() >= 0) {
			Employee e = employeeJpaRepository.findById(shift.getAssignedId()).get();
			e.addAssignedId(createdShift.getId());
			employeeJpaRepository.save(e);
		}
		
		// make the new uri available to return
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdShift.getId()).toUri();
		
		// return void ResponseEntity with HttpStatus.CREATED
		return ResponseEntity.created(uri).build().created(uri).header("MyResponseHeader", "id").body(createdShift.getId());
	}
	
	@DeleteMapping(path="/users/{username}/shifts/{id}")
	public ResponseEntity<Void> deleteShift(@PathVariable String username, @PathVariable long id){
		long e_id = shiftJpaRepository.findById(id).get().getAssignedId();
		
		if (e_id >= 0) {
			Employee e = employeeJpaRepository.findById(e_id).get();
			e.removeAssignedId(id);
			employeeJpaRepository.save(e);
		}
		
		shiftJpaRepository.deleteById(id);
		
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping(path="/users/{username}/shifts/{s_id}/assign/{e_id}")
	public Shift assignNewEmployee(@PathVariable String username, @PathVariable long s_id, @PathVariable long e_id){
		Shift old_shift = shiftJpaRepository.findById(s_id).get();
//		System.out.println("============1======");
		
		if (old_shift.getAssignedId() != e_id) {
			long old_assigned_id = old_shift.getAssignedId();
			if (old_assigned_id != -1){
				Employee old_e = employeeJpaRepository.findById(old_assigned_id).get();
					old_e.removeAssignedId(s_id);
					employeeJpaRepository.save(old_e);
			}
			
			if (e_id != -1) {
				Employee new_e = employeeJpaRepository.findById(e_id).get();
				new_e.addAssignedId(s_id);
				employeeJpaRepository.save(new_e);
			}
			
			old_shift.setAssignedId(e_id);
			shiftJpaRepository.save(old_shift);
		}

		return old_shift;
	}
}