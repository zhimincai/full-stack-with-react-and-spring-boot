package com.todoapp.webservices.restfulwebservices.schedule;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftJpaRepository extends JpaRepository<Shift, Long>{

	List<Shift> findByUsername(String username);
	
	List<Shift> findByDayOfWeekAndUsername(int dayOfWeek, String username);

	Shift findByUsernameAndId(String username, Long id);
}
