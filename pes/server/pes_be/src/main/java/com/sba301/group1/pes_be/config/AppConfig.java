package com.sba301.group1.pes_be.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Collections;

@Configuration
public class AppConfig {

    @Bean
    public SimplePasswordEncoder passwordEncoder() {
        return new SimplePasswordEncoder();
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public FilterRegistrationBean<SimpleAuthFilter> authFilterRegistration(SimpleAuthFilter authFilter) {
        FilterRegistrationBean<SimpleAuthFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(authFilter);
        registration.addUrlPatterns("/*");
        registration.setOrder(2); // After CORS filter
        return registration;
    }

    public static class SimplePasswordEncoder {
        private final SecureRandom random = new SecureRandom();

        public String encode(String rawPassword) {
            byte[] salt = new byte[16];
            random.nextBytes(salt);
            String saltString = Base64.getEncoder().encodeToString(salt);
            
            try {
                MessageDigest md = MessageDigest.getInstance("SHA-256");
                md.update(salt);
                byte[] hashedPassword = md.digest(rawPassword.getBytes());
                String hashedString = Base64.getEncoder().encodeToString(hashedPassword);
                return saltString + ":" + hashedString;
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException("SHA-256 algorithm not available", e);
            }
        }

        public boolean matches(String rawPassword, String encodedPassword) {
            if (encodedPassword == null || !encodedPassword.contains(":")) {
                return false;
            }
            
            String[] parts = encodedPassword.split(":", 2);
            String saltString = parts[0];
            String hashedString = parts[1];
            
            try {
                byte[] salt = Base64.getDecoder().decode(saltString);
                MessageDigest md = MessageDigest.getInstance("SHA-256");
                md.update(salt);
                byte[] hashedPassword = md.digest(rawPassword.getBytes());
                String newHashedString = Base64.getEncoder().encodeToString(hashedPassword);
                return hashedString.equals(newHashedString);
            } catch (Exception e) {
                return false;
            }
        }
    }
}
