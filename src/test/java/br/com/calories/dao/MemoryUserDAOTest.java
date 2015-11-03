package br.com.calories.dao;

import org.junit.Assert;
import org.junit.Test;

import br.com.calories.model.User;

public class MemoryUserDAOTest {
	
	private MemoryUserDAO dao = new MemoryUserDAO();
	
	@Test
	public void testFindByEmail() {
		User user = dao.find("cindy@email.com");
		Assert.assertNotNull("Didn´t find the user.", user);
		Assert.assertEquals("Wrong user.", "Cindy Soares", user.getName());
	}

	@Test
	public void testFindByEmail_whenUserDoesntExists() {
		User user = dao.find("xxx@email.com");
		Assert.assertNull("The user was found.", user);
	}

	@Test
	public void testFindById() {
		User user = dao.find(1);
		Assert.assertNotNull("Didn´t find the user.", user);
		Assert.assertEquals("Wrong user.", "Cindy Soares", user.getName());
	}

}
