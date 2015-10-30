package br.com.calories.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import br.com.calories.dao.UserDAO;
import br.com.calories.model.User;

@Path("/")
public class Login {
	
	private UserDAO dao = new UserDAO();
	
	@GET
	@Path("/login")
	@Produces(MediaType.TEXT_PLAIN)
	public User login(@QueryParam("email") String email, @QueryParam("password") String password) {
		System.out.println("login: " + email);
		return dao.find(email);
	}

}
