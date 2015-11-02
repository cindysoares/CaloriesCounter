package br.com.calories.rest.config;

import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.server.TracingConfig;

import br.com.calories.rest.Login;
import br.com.calories.rest.Settings;

public class JerseyConfig extends ResourceConfig {

	public JerseyConfig() {
		super(
				Login.class,
				Settings.class,
				JacksonFeature.class
        );
		
        //packages("br.com.calories.rest");
        //register(new JacksonFeature());
        register(LoggingFilter.class);
        property(ServerProperties.TRACING, TracingConfig.ON_DEMAND.name());
	}
	
}
