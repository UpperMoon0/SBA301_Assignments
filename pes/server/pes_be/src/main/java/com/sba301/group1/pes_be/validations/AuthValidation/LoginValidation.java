package com.sba301.group1.pes_be.validations.AuthValidation;

import com.sba301.group1.pes_be.enums.Status;
import com.sba301.group1.pes_be.models.Account;
import com.sba301.group1.pes_be.repositories.AccountRepo;
import com.sba301.group1.pes_be.requests.LoginRequest;

public class LoginValidation {
    public static String validate(LoginRequest request, AccountRepo accountRepo) {
        Account account = accountRepo.findByEmailAndStatus(request.getEmail(), Status.ACCOUNT_ACTIVE.getValue()).orElse(null);

        if (account == null) {
            return "Account not available";
        }

        if (account.getStatus().equals(Status.ACCOUNT_BAN.getValue())) {
            return "Account is banned";
        }

        if (!account.getEmail().equals(request.getEmail())) {
            return "Email is incorrect";
        }

        if (!account.getPassword().equals(request.getPassword())) {
            return "Password is incorrect";
        }
        return "";
    }
}
