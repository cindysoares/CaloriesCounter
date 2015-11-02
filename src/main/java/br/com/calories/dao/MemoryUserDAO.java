package br.com.calories.dao;

import java.util.HashSet;
import java.util.Set;

import br.com.calories.model.Profile;
import br.com.calories.model.User;

public class MemoryUserDAO implements UserDAO {
	
	private static Set<User> users = new HashSet<User>();
	
	static {
		users.add(new User("Cindy", "cindy@email.com", "senha", 1800, Profile.USER));
		users.add(new User("User manager", "manager@email.com", "1234", null, Profile.USER_MANAGER));
		users.add(new User("User admin", "admin@email.com", "4321", null, Profile.ADMIN_MANAGER));
	}
	
	public User find(Integer userId) {
		return (User) users.stream().filter(u -> u.getId().equals(userId)).findFirst().orElse(null);
	}
	
	public User find(String email) {
		return users.stream().filter(u -> u.getEmail().equals(email)).findFirst().orElse(null);
	}
	
	public boolean save(User user) {
		return users.add(user);
	}
	
	public boolean update(User user) {
		return true;
	}
	
	public boolean remove(Integer userId) {
		return users.remove(find(userId));
	}

}
