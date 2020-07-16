package com.todoapp.webservices.restfulwebservices.schedule;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvailibilityWeeklyJpaRepository extends JpaRepository<AvailibilityWeekly, Long>{

	List<AvailibilityWeekly> findByUsername(String username);
}
