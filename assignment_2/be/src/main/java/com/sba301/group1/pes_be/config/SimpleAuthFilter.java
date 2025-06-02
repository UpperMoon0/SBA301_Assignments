package com.sba301.group1.pes_be.config;

import com.sba301.group1.pes_be.models.Account;
import com.sba301.group1.pes_be.repositories.AccountRepo;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SimpleAuthFilter implements Filter {

    private final AccountRepo accountRepo;
    private final AppConfig.SimplePasswordEncoder passwordEncoder;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String path = httpRequest.getRequestURI();
        
        // Allow public endpoints
        if (path.startsWith("/api/v1/auth/") || 
            path.startsWith("/swagger-ui") || 
            path.startsWith("/v3/api-docs") ||
            path.startsWith("/actuator")) {
            chain.doFilter(request, response);
            return;
        }

        // Check for Basic Authentication
        String authHeader = httpRequest.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            sendUnauthorizedResponse(httpResponse);
            return;
        }

        try {
            String base64Credentials = authHeader.substring(6);
            String credentials = new String(Base64.getDecoder().decode(base64Credentials));
            String[] parts = credentials.split(":", 2);
            
            if (parts.length != 2) {
                sendUnauthorizedResponse(httpResponse);
                return;
            }

            String email = parts[0];
            String password = parts[1];

            Optional<Account> accountOpt = accountRepo.findByEmail(email);
            if (accountOpt.isEmpty()) {
                sendUnauthorizedResponse(httpResponse);
                return;
            }

            Account account = accountOpt.get();
            if (!"ACTIVE".equalsIgnoreCase(account.getStatus()) || 
                !passwordEncoder.matches(password, account.getPassword())) {
                sendUnauthorizedResponse(httpResponse);
                return;
            }

            // Set account in request for later use
            httpRequest.setAttribute("currentUser", account);
            chain.doFilter(request, response);

        } catch (Exception e) {
            sendUnauthorizedResponse(httpResponse);
        }
    }

    private void sendUnauthorizedResponse(HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"message\":\"Unauthorized\",\"success\":false,\"data\":null}");
    }
}
