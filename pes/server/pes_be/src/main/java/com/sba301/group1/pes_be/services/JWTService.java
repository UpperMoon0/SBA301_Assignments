package com.sba301.group1.pes_be.services;

import com.sba301.group1.pes_be.models.Account;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {
    String extractEmailFromJWT(String jwt);

    Account extractAccountFromCookie(HttpServletRequest request);

    String generateAccessToken(UserDetails user);

    String generateRefreshToken(UserDetails user);

    boolean checkIfNotExpired(String jwt);
}
