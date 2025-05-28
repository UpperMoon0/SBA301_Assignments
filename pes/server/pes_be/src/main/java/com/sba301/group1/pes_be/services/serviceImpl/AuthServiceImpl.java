package com.sba301.group1.pes_be.services.serviceImpl;

import com.sba301.group1.pes_be.config.AppConfig;
import com.sba301.group1.pes_be.models.Account;
import com.sba301.group1.pes_be.repositories.AccountRepo;
import com.sba301.group1.pes_be.requests.LoginRequest;
import com.sba301.group1.pes_be.requests.ResponseObject;
import com.sba301.group1.pes_be.services.AuthService;
import com.sba301.group1.pes_be.utils.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AccountRepo accountRepo;
    private final AppConfig.SimplePasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<ResponseObject> login(LoginRequest request) {
        try {
            Account account = accountRepo.findByEmail(request.getEmail())
                    .orElse(null);

            if (account == null) {
                return ResponseUtil.build(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password",
                        false,
                        null
                );
            }

            if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
                return ResponseUtil.build(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password",
                        false,
                        null
                );
            }

            return ResponseUtil.build(
                    HttpStatus.OK,
                    "Login successful",
                    true,
                    account
            );

        } catch (Exception e) {
            return ResponseUtil.build(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "An error occurred during login",
                    false,
                    null
            );
        }
    }
}
