package br.com.calories.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/setttings")
@Produces(MediaType.TEXT_HTML)
public class Settings {

	@GET
	@Path("/{userId}/{calories}")
	@Produces(MediaType.APPLICATION_JSON)
	public Integer setCaloriesLimit(@PathParam("userId") Integer userId,
			@PathParam("calories")  Integer caloriesLimit) {
		System.out.println("Chamou o serviço: " + caloriesLimit);
		return caloriesLimit;
	}
	
}
