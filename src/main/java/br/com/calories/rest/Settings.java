package br.com.calories.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.calories.dao.UserDAO;
import br.com.calories.model.User;

@Path("/setttings")
public class Settings {

	private UserDAO dao = new UserDAO();
	
	@GET
	@Path("/{userId}/{calories}")
	@Produces(MediaType.APPLICATION_JSON)
	public User setCaloriesLimit(@PathParam("userId") Integer userId,
			@PathParam("calories")  Integer caloriesLimit) {
		System.out.println("Chamou o servi�o: " + caloriesLimit);
		User user = dao.find(userId);
		if (user != null) {
			user.setCaloriesLimit(caloriesLimit);
		}
		return user;
	}
	
}
