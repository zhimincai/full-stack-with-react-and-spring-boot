package com.todoapp.webservices.restfulwebservices.schedule;

import java.sql.Time;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Shift {

	@Id
	@GeneratedValue
	private Long id;
	
	private String username, description, position, note, timeSlot;
	private int dayOfWeek, level;
	
	protected Shift() {
		
	}

	public Shift(Long id, String username, String description, String position, String note, String timeSlot, int dayOfWeek,
			int level) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.position = position;
		this.note = note;
		this.timeSlot = timeSlot;
		this.dayOfWeek = dayOfWeek;
		this.level = level;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getDescription() {
		return description;
	}

	public String getPosition() {
		return position;
	}

	public String getNote() {
		return note;
	}
	
	public int getLevel() {
		return level;
	}

	public int getDayOfWeek() {
		return dayOfWeek;
	}

	public void setDayOfWeek(int dayOfWeek) {
		this.dayOfWeek = dayOfWeek;
	}

	public String getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(String timeSlot) {
		this.timeSlot = timeSlot;
	}

	@Override
	public String toString() {
		return "Shift [id=" + id + ", username=" + username + ", description=" + description + ", position=" + position
				+ ", note=" + note + ", timeSlot=" + timeSlot + ", dayOfWeek=" + dayOfWeek + ", level=" + level + "]";
	}
	
	
}
