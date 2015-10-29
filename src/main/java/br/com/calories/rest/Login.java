package br.com.calories.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.calories.dao.UserDAO;
import br.com.calories.model.User;

@Path("/login")
public class Login {
	
	private UserDAO dao = new UserDAO();
	
	@GET
	@Path("/{email}/{password}")
	@Produces(MediaType.APPLICATION_JSON)
	public User login(@PathParam("email") String email, @PathParam("password") String password) {
		return dao.find(email);
	}

}
