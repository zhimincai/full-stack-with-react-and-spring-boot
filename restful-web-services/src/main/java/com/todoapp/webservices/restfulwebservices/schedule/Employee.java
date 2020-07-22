package com.todoapp.webservices.restfulwebservices.schedule;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.util.SerializationUtils;

@Entity
public class Employee implements Comparable<Employee> {

	@Id
	@GeneratedValue
	private Long id;
	
	private String username, employeeName, position;
	private Date startDate;
	private int shiftLimitWeekly, level;
	private byte[] assignedShiftIds;
	
	protected Employee() {
		
	}
	
	public Employee(Long id, String username, String employeeName, String position, int level,
			Date startDate, int shiftLimitWeekly) {
		super();
		this.id = id;
		this.setUsername(username);
		this.employeeName = employeeName;
		this.position = position;
		this.level = level;
		this.startDate = startDate;
		this.shiftLimitWeekly = shiftLimitWeekly;
		this.assignedShiftIds = SerializationUtils.serialize(new ArrayList<>());
	}
	
	public void addAssignedId(long AssignedId) {
		List<Long> ids = this.getAssignedShiftIds();
		if (ids == null) {
			ids = new ArrayList<>();
		}
		ids.add(AssignedId);
		this.setAssignedShiftIds(ids);
	}
	
	public void removeAssignedId(long AssignedId) {
		List<Long> ids = this.getAssignedShiftIds();
		ids.remove(AssignedId);
		this.setAssignedShiftIds(ids);
	}
	
	public boolean canTakeMore() {
		List<Long> ids = this.getAssignedShiftIds();
		if (ids != null) {
			return ids.size() < this.shiftLimitWeekly;
		} else {
			return this.shiftLimitWeekly > 0;
		}
	}

	public int compareTo(Employee other) {
		return level - other.getLevel();
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public int getShiftLimitWeekly() {
		return shiftLimitWeekly;
	}

	public void setShiftLimitWeekly(int shiftLimitWeekly) {
		this.shiftLimitWeekly = shiftLimitWeekly;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long idCounter) {
		this.id = idCounter;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<Long> getAssignedShiftIds() {
		return (List<Long>) SerializationUtils.deserialize(assignedShiftIds);
	}

	public void setAssignedShiftIds(List<Long> assignedShiftIds) {
		this.assignedShiftIds = SerializationUtils.serialize(assignedShiftIds);
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", username=" + username + ", employeeName=" + employeeName + ", position="
				+ position + ", startDate=" + startDate + ", shiftLimitWeekly=" + shiftLimitWeekly + ", level=" + level
				+ ", assignedShiftIds=" + assignedShiftIds + "]";
	}
}
