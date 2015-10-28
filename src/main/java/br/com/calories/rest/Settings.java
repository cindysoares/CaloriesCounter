package br.com.calories.rest;

import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/")
@Produces(MediaType.TEXT_HTML)
public class Settings {

	@Path("/setttings/{userId}/{calories}")
	public void setCaloriesLimit(@PathParam("userId") Integer userId,
			@PathParam("calories")  Integer caloriesLimit) {
		
	}
	
}
