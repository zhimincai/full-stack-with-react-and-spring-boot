package com.todoapp.webservices.restfulwebservices.schedule;

import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AvailibilityWeekly {

	@Id
//	@GeneratedValue
	private Long id;
	
	private String username;
	private int avMon, avTue, avWed, avThur, avFri, avSat, avSun;

	public AvailibilityWeekly() {
		
	}
	public AvailibilityWeekly(Long id, String username, int avMon, int avTue, int avWed, int avThur, int avFri, int avSat, int avSun) {
		super();
		this.id = id;
		this.username = username;
		this.avMon = avMon;
		this.avTue = avTue;
		this.avWed = avWed;
		this.avThur = avThur;
		this.avFri = avFri;
		this.avSat = avSat;
		this.avSun = avSun;
	}

	public int getAv(int dayOfWeek) {
		int av = -1;
		switch(dayOfWeek) {
			case 1: 
				av = this.avMon;
				break;
			case 2: 
				av =  this.avTue;
				break;
			case 3: 
				av = this.avWed;
				break;
			case 4: 
				av =  this.avThur;
				break;
			case 5: 
				av = this.avFri;
				break;
			case 6: 
				av =  this.avSat;
				break;
			case 7: 
				av = this.avSun;
		}
		
		return av;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public void setAvMon(int avMon) {
		this.avMon = avMon;
	}


	public void setAvTue(int avTue) {
		this.avTue = avTue;
	}


	public void setAvWed(int avWed) {
		this.avWed = avWed;
	}


	public void setAvThur(int avThur) {
		this.avThur = avThur;
	}


	public void setAvFri(int avFri) {
		this.avFri = avFri;
	}


	public void setAvSat(int avSat) {
		this.avSat = avSat;
	}


	public void setAvSun(int avSun) {
		this.avSun = avSun;
	}


	public String getUsername() {
		return username;
	}
	
	public Long getId() {
		return id;
	}


	public int getAvMon() {
		return avMon;
	}


	public int getAvTue() {
		return avTue;
	}


	public int getAvWed() {
		return avWed;
	}


	public int getAvThur() {
		return avThur;
	}


	public int getAvFri() {
		return avFri;
	}


	public int getAvSat() {
		return avSat;
	}


	public int getAvSun() {
		return avSun;
	}


	@Override
	public String toString() {
		return "AvailibilityWeekly [id=" + id + ", username=" + username + ", avMon=" + avMon + ", avTue=" + avTue
				+ ", avWed=" + avWed + ", avThur=" + avThur + ", avFri=" + avFri + ", avSat=" + avSat + ", avSun="
				+ avSun + "]";
	}

	
}
