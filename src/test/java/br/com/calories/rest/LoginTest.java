package br.com.calories.rest;

import static org.junit.Assert.assertTrue;

import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.client.ClientConfig;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.glassfish.jersey.test.TestProperties;
import org.junit.Test;

import br.com.calories.rest.config.JerseyConfig;
import br.com.calories.rest.config.MyObjectMapperProvider;

public class LoginTest extends JerseyTest {
	
    @Override
    protected ResourceConfig configure() {
        enable(TestProperties.LOG_TRAFFIC);
        enable(TestProperties.DUMP_ENTITY);

        return new JerseyConfig();
    }

    @Override
    protected void configureClient(ClientConfig config) {
        config.register(new JacksonFeature()).register(MyObjectMapperProvider.class);
    }

    @Test
    public void test() {
        WebTarget target = target();
        String responseMsg = target.path("/login")
        		.queryParam("email", "cindy@email.com")
        		.request(MediaType.APPLICATION_JSON).get(String.class);
        assertTrue("Response: " + responseMsg, responseMsg.replaceAll("[ \t]*", "").contains("[]"));
    }

/*    @Test
    public void testJSONPPresent() {
        WebTarget target = target();
        String responseMsg = target.path("nonJaxbResource").request("application/javascript").get(String.class);
        assertTrue(responseMsg.startsWith("callback("));
    }
*/

}
