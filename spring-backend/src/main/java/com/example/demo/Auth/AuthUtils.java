package com.example.demo.Auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;

import com.example.demo.Users.Users;

public class AuthUtils {

    public static Users getAuthUser(SecurityContext securityContext){
        Authentication authentication = securityContext.getAuthentication();
        Users user = (Users) authentication.getPrincipal();
        return user;
    }
}
