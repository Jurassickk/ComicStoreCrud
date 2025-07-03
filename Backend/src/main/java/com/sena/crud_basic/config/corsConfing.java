package com.sena.crud_basic.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class corsConfing {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        //permitir solicitudes desde todos los origenes:
        config.addAllowedOrigin("http://localhost:3000");
        //config.setAllowedOrigin("*");

        //permitir solicitudes con estos metodos HTTP
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");

        //permitir solicitudes con estos encabezados
        config.addAllowedHeader("*");

        //permitir el envio de ciertos encabezados en las solicitudes
        config.addAllowedHeader("Authorization");
        config.addAllowedHeader("Content-Type");    
        //config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
