package com.todoapp.webservices.restfulwebservices;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.api.TestReporter;

import com.todoapp.webservices.restfulwebservices.schedule.EmployeeJpaResource;

//@SpringBootTest
class RestfulWebServicesApplicationTests {
	
	@BeforeEach
	void init(TestReporter testReporter, TestInfo testInfo) {
		testReporter.publishEntry("running ", testInfo.getTestMethod().get().getName());
	}

	@Test
	void contextLoads() {
	}
	
	@Test
	void testDatabase() {
		System.out.println("=========before=====");
//		EmployeeJpaResource employeeJpaResource = new EmployeeJpaResource();
//		System.out.println(employeeJpaResource.getAllEmployees("Mazarine Coffee"));
	}

}
