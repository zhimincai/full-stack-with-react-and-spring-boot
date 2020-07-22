package com.todoapp.webservices.restfulwebservices.schedule;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Shift implements Comparable<Shift>{

	@Id
	@GeneratedValue
	private Long id;
	
	private String username, description, position, note;
	private int dayOfWeek, level, timeSlot;
	
	private Long assignedId;
	
	protected Shift() {
		
	}

	public Shift(Long id, String username, String description, String position, String note, int timeSlot, int dayOfWeek,
			int level, Long assignedId) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.position = position;
		this.note = note;
		this.timeSlot = timeSlot;
		this.dayOfWeek = dayOfWeek;
		this.level = level;
		this.assignedId = assignedId;
	}
	
	public boolean isAssigned() {
		if (this.assignedId >= 0) {
			return true;
		}
		return false;
	}

	public int compareTo(Shift other) {
		return other.getLevel() - level;
	}
	
	public int getDayOfWeek() {
		return dayOfWeek;
	}

	public String getDescription() {
		return description;
	}

	public Long getId() {
		return id;
	}

	public int getLevel() {
		return level;
	}

	public String getNote() {
		return note;
	}

	public String getPosition() {
		return position;
	}

	public int getTimeSlot() {
		return timeSlot;
	}

	public String getUsername() {
		return username;
	}

	public void setDayOfWeek(int dayOfWeek) {
		this.dayOfWeek = dayOfWeek;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public void setLevel(int level) {
		this.level = level;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public void setTimeSlot(int timeSlot) {
		this.timeSlot = timeSlot;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Long getAssignedId() {
		return this.assignedId;
	}

	public void setAssignedId(Long assignedId) {
		this.assignedId = assignedId;
	}

	@Override
	public String toString() {
		return "Shift [id=" + id + ", username=" + username + ", description=" + description + ", position=" + position
				+ ", note=" + note + ", dayOfWeek=" + dayOfWeek + ", level=" + level + ", timeSlot=" + timeSlot
				+ ", assignedId=" + assignedId + "]";
	}
	
}


