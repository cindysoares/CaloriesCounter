package br.com.calories.dao;

import br.com.calories.model.User;

public interface UserDAO {

	User find(String email);

	User find(Integer userId);

	User update(User user);

	boolean remove(Integer userId);

	User save(User user);

}
