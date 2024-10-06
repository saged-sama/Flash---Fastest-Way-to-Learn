package com.example.demo.Configuration;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    private final List<String> origins = Arrays.asList("http://localhost:3000");
    
    @Bean
    public CorsFilter corsFilter(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();  
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(origins);
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");

        return new CorsFilter(source -> corsConfiguration);
    }

}