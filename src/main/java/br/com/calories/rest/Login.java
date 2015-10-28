package br.com.calories.rest;

import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import br.com.calories.model.User;

@Path("/")
@Produces(MediaType.TEXT_HTML)
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Login {
	
	@Path("/login/{email}/{password}")
	public User login(@PathParam("email") String email, @PathParam("password") String password) {
		return new User();
	}

}
