package com.todoapp.webservices.restfulwebservices.schedule;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Employee {

	@Id
	@GeneratedValue
	private Long id;
	
	private String username, employeeName, position, level;
	private Date startDate;
	private int shiftLimitWeekly;
	
	protected Employee() {
		
	}
	
	public Employee(Long id, String username, String employeeName, String position, String level,
			Date startDate, int shiftLimitWeekly) {
		super();
		this.id = id;
		this.setUsername(username);
		this.employeeName = employeeName;
		this.position = position;
		this.level = level;
		this.startDate = startDate;
		this.shiftLimitWeekly = shiftLimitWeekly;
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

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
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

	@Override
	public String toString() {
		return "Employee [id=" + id + ", employeeName=" + employeeName + ", position=" + position + ", level=" + level
				+ ", startDate=" + startDate + ", shiftLimitWeekly="
				+ shiftLimitWeekly + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((employeeName == null) ? 0 : employeeName.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((level == null) ? 0 : level.hashCode());
		result = prime * result + ((position == null) ? 0 : position.hashCode());
		result = prime * result + ((startDate == null) ? 0 : startDate.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Employee other = (Employee) obj;
		if (employeeName == null) {
			if (other.employeeName != null)
				return false;
		} else if (!employeeName.equals(other.employeeName))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (level == null) {
			if (other.level != null)
				return false;
		} else if (!level.equals(other.level))
			return false;
		if (position == null) {
			if (other.position != null)
				return false;
		} else if (!position.equals(other.position))
			return false;
		if (startDate == null) {
			if (other.startDate != null)
				return false;
		} else if (!startDate.equals(other.startDate))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

}
