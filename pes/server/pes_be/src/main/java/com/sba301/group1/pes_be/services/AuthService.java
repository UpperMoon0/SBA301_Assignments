package com.sba301.group1.pes_be.services;

import com.sba301.group1.pes_be.requests.LoginRequest;
import com.sba301.group1.pes_be.requests.ResponseObject;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<ResponseObject> login(LoginRequest request);
}
