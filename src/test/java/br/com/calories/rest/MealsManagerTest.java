package br.com.calories.rest;

import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.glassfish.jersey.test.TestProperties;
import org.junit.Assert;
import org.junit.Test;

import br.com.calories.model.Meal;

public class MealsManagerTest  extends JerseyTest {
	
    @Override
    protected ResourceConfig configure() {
        enable(TestProperties.LOG_TRAFFIC);
        enable(TestProperties.DUMP_ENTITY);

        return new JerseyConfig();
    }
    
    @Test
    public void test_addMeal() {
        WebTarget target = target();
        Meal responseMsg = target.path("/meals/add/1")/*
        		.queryParam("date", new Date())*/
        		.queryParam("description", "snack")
        		.queryParam("calories", new Integer(200))
        		.request(MediaType.APPLICATION_JSON).post(null, Meal.class);
        Assert.assertNotNull("Didn´t add the meal.", responseMsg);
        Assert.assertNotNull("Didn´t set an id.", responseMsg.getId());
        Assert.assertEquals("snack", responseMsg.getDescription());
        Assert.assertEquals(new Integer(200), responseMsg.getCalories());
    }
    
    @Test
    public void test_addMealToANonExistentUser() {
        WebTarget target = target();
        Meal responseMsg = target.path("/meals/add/999")
        		.request(MediaType.APPLICATION_JSON).post(null, Meal.class);
        Assert.assertNull("Added the meal to a non-existent .", responseMsg);
    }

}
