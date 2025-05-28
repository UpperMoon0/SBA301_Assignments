package com.sba301.group1.pes_be.confgs;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                title = "PES_SBA301",
                version = "1.0",
                description = "The Preschool Enrollment System"
        ),

        servers =  {
                @Server (
                        description = "localhost",
                        url = "http://localhost:8080/"
                )
        }
)
public class SwaggerConfig {
}
