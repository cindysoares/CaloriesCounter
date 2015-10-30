package br.com.calories.rest;

import java.util.Date;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import br.com.calories.dao.UserDAO;
import br.com.calories.model.Meal;
import br.com.calories.model.User;

@Path("/meals")
public class MealsManager {
	
	private UserDAO dao = new UserDAO();
	
	@POST
	@Path("/add/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Meal addMeal(@PathParam("userId") Integer userId, 
			@QueryParam("date") Date date, @QueryParam("description") String description, @QueryParam("calories") Integer calories) {
		User user = dao.find(userId);
		Meal meal = null;
		if(user != null) {
			meal = new Meal(date, description, calories);
			user.addMeal(meal);
		}
		return meal;
	}
	
	@POST
	@Path("/update/{userId}/{mealId}")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean updateMeal(@PathParam("userId") Integer userId, @PathParam("mealId") Integer mealId, 
			@QueryParam("date") Date date, @QueryParam("description") String description, @QueryParam("calories") Integer calories) {
		User user = dao.find(userId);
		Meal meal = user.getMeals().stream().filter(m -> m.getId().equals(mealId)).findFirst().orElse(null);
		if(meal == null) {
			return false;
		}
		meal.setDate(date);
		meal.setDescription(description);
		meal.setCalories(calories);
		return true;
	}

	@POST
	@Path("/remove/{userId}/{mealId}")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean removeMeal(@PathParam("userId") Integer userId, @PathParam("mealId") Integer mealId) {
		User user = dao.find(userId);
		return user.getMeals().removeIf(m -> m.getId().equals(mealId));
	}

}
