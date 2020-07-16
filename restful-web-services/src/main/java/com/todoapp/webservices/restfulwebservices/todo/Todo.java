package com.todoapp.webservices.restfulwebservices.todo;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Todo {

	@Id
	@GeneratedValue
	private Long id;
	
	private String username, description, note;
	private boolean complete;
	private Date targetDate;
	
	protected Todo() {
		
	}
	
	public Todo(long id, String username, String description, boolean complete, Date targetDate, String note) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.note = note;
		this.complete = complete;
		this.targetDate = targetDate;
	}
	
	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param idCounter the id to set
	 */
	public void setId(Long idCounter) {
		this.id = idCounter;
	}

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the note
	 */
	public String getNote() {
		return note;
	}

	/**
	 * @param note the note to set
	 */
	public void setNote(String note) {
		this.note = note;
	}

	/**
	 * @return the isCompleted
	 */
	public boolean isComplete() {
		return complete;
	}

	/**
	 * @param isCompleted the isCompleted to set
	 */
	public void setComplete(boolean complete) {
		this.complete = complete;
	}

	/**
	 * @return the targetDate
	 */
	public Date getTargetDate() {
		return targetDate;
	}

	/**
	 * @param targetDate the targetDate to set
	 */
	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Todo other = (Todo) obj;
		if (id != other.id)
			return false;
		return true;
	}


	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Todo [id=" + id + ", username=" + username + ", description=" + description + ", note=" + note
				+ ", complete=" + complete + ", targetDate=" + targetDate + "]";
	}

}
