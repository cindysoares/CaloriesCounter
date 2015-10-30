package br.com.calories.rest;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import br.com.calories.dao.MemoryUserDAO;
import br.com.calories.dao.UserDAO;
import br.com.calories.model.Profile;
import br.com.calories.model.User;

@Path("/user")
public class UsersManager {

	private UserDAO dao = new MemoryUserDAO();
	
	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	public User addUser(@QueryParam("name") String name, @QueryParam("email") String email, 
			@QueryParam("caloriesLimit") Integer caloriesLimit, @QueryParam("profile") String profile) {
		User user = new User(name, email, caloriesLimit, Profile.valueOf(profile));
		dao.save(user);
		return user;
	}
	
	@POST
	@Path("/update/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean updateUser(@PathParam("userId") Integer userId, @QueryParam("name") String name, @QueryParam("email") String email, 
			@QueryParam("caloriesLimit") Integer caloriesLimit, @QueryParam("profile") String profile) {
		User user = dao.find(userId);
		user.setName(name);
		user.setEmail(email);
		user.setCaloriesLimit(caloriesLimit);
		user.setProfile(Profile.valueOf(profile));
		return dao.update(user);
	}

	@POST
	@Path("/remove/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean removeMeal(@PathParam("userId") Integer userId) {
		return dao.remove(userId);
	}

}
