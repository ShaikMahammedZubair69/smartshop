package com.smartshop.api_gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import java.util.Arrays;


@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }



    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        // Allow both ports just in case Vite switches back to 5173
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:5174", "http://localhost:5173"));
        corsConfig.setMaxAge(3600L); // Cache preflight response for 1 hour
        corsConfig.addAllowedMethod("*"); // Allow GET, POST, PUT, DELETE, OPTIONS
        corsConfig.addAllowedHeader("*"); // Allow Authorization, Content-Type, etc.

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig); // Apply to ALL routes

        return new CorsWebFilter(source);
    }
}