package com.todoapp.webservices.restfulwebservices.schedule;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.SerializationUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

//Controller
@RestController
@CrossOrigin(origins="http://localhost:4200")
public class ScheduleController {
	
	@Autowired
	EmployeeJpaRepository employeeJpaRepository;
	
	@Autowired
	AvailibilityWeeklyJpaRepository availibilityJpaRepository;
	
	@Autowired
	ShiftJpaRepository shiftJpaRepository;
	
	@GetMapping(path="/users/{username}/schedule")
	public List<Shift> schedule(@PathVariable String username) {
		
		int highest_level = 4;
		
		List<Employee> employees = employeeJpaRepository.findByUsername(username);

		// pre-process a map: (key - level, value - list of employees with the level)
		ArrayList<ArrayList<Integer>> level_idx_employees = new ArrayList<>();
		for (int i = 0; i <= highest_level; i++) {
			level_idx_employees.add(new ArrayList<Integer>());
		}

		ArrayList<AvailibilityWeekly> avs = new ArrayList<AvailibilityWeekly>();
		AvailibilityWeekly cur_av;
		Employee e;
		for(int i = 0; i < employees.size(); i++) {
			e = employees.get(i);
			
			cur_av = availibilityJpaRepository.findById(e.getId()).get();
			avs.add(cur_av);
			
			level_idx_employees.get(e.getLevel()).add(i);
		}
		
		for (int dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {
			
			List<Shift> shifts = shiftJpaRepository.findByDayOfWeekAndUsername(dayOfWeek, username);
			
			// for each day-of-week, find e for higher level required shift first
			shifts.sort(null); 
			
			ArrayList<ArrayList<Integer>> level_idx_employees_copy = clone(level_idx_employees);
			System.out.println(level_idx_employees);
			
			for (Shift s: shifts) {
				int required_level = s.getLevel(), cur_time_slot = s.getTimeSlot();
				// for each shift (from higher level to lower)
				for (int cur_level = highest_level; cur_level >= required_level; cur_level--) {
					ArrayList<Integer> cur_idx_lst = level_idx_employees_copy.get(cur_level);
					
					for (int i = 0; i < cur_idx_lst.size(); i++) {
						int e_idx = cur_idx_lst.get(i);
						Employee cur_e = employees.get(e_idx);
						AvailibilityWeekly av = avs.get(e_idx);
						// look for qualified and NOT assigned e, assign the shift to [higher level] one
						if (cur_e.canTakeMore() &&  av.getAv(dayOfWeek) == cur_time_slot) {
							
							s.setAssignedId(cur_e.getId());
							cur_e.addAssignedId(s.getId());
							
							cur_idx_lst.remove(i);

							break;
						}
					}
					
					if (s.isAssigned()) {
						break;
					}
				}
			}
			
			shiftJpaRepository.saveAll(shifts);
		}
		
		employeeJpaRepository.saveAll(employees);
		
		return shiftJpaRepository.findByUsername(username);
	}
	
	@DeleteMapping(path="/users/{username}/clear-schedule")
	public ResponseEntity<Void> clearSchedule(@PathVariable String username) {
		
		List<Shift> shifts = shiftJpaRepository.findByUsername(username);	
		for (Shift s: shifts) {
			s.setAssignedId((long) -1);
		}		
		shiftJpaRepository.saveAll(shifts);
		
		List<Employee> employees = employeeJpaRepository.findByUsername(username);
		for (Employee e: employees) {
			e.setAssignedShiftIds(new ArrayList<>());
		}
		employeeJpaRepository.saveAll(employees);
		
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping(path="/users/{username}/shift-match/{shift_id}")
	public List<Employee> matchAvailibleEmployee(@PathVariable String username, @PathVariable long shift_id) {
		
		List<Employee> targets = new ArrayList<>();
		
		Shift s = shiftJpaRepository.findByUsernameAndId(username, shift_id);
		long cur_assigned_e_id = s.getAssignedId();

		List<Employee> qualifiedEmployees = matchAvailibleEmployee(username, s.getLevel());
		ArrayList<AvailibilityWeekly> avs = new ArrayList<AvailibilityWeekly>();
		
		AvailibilityWeekly cur_av;
		for(Employee e: qualifiedEmployees) {
			cur_av = availibilityJpaRepository.findById(e.getId()).get();
			avs.add(cur_av);
		}
		
		int dayOfWeek = s.getDayOfWeek(), cur_time_slot = s.getTimeSlot();
		
		for (int e_idx = 0; e_idx < qualifiedEmployees.size(); e_idx++) {
			
			Employee cur_e = qualifiedEmployees.get(e_idx);
			AvailibilityWeekly av = avs.get(e_idx);
			
			// look for qualified and NOT assigned e, assign the shift to [higher level] one
			if (cur_e.getId() != cur_assigned_e_id && cur_e.canTakeMore() &&  av.getAv(dayOfWeek) == cur_time_slot) {
				
				targets.add(cur_e);
			}
		}
		return targets;
	}
	
	@GetMapping(path="/users/{username}/test/{level}")
	public List<Employee> matchAvailibleEmployee(@PathVariable String username, @PathVariable int level) {
		
		return employeeJpaRepository.findByUsernameAndLevelGreaterThanEqual(username, level);
	}
	
	@SuppressWarnings("unchecked")
	public static <T extends Serializable> T clone(T object) {
	     return (T) SerializationUtils.deserialize(SerializationUtils.serialize(object));
	}
}
