package com.sba301.group1.pes_be.enums;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

public enum Role {
    PARENT,
    ADMISSION,
    HR,
    EDUCATION,
    TEACHER;

    public List<SimpleGrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.name().toLowerCase()));
    }
}
