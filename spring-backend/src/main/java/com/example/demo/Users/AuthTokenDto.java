package com.example.demo.Users;

import lombok.Data;

@Data
public class AuthTokenDto {
    private String token;

    public AuthTokenDto() {
    }

    public AuthTokenDto(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "AuthTokenDto{" +
                "token='" + token + '\'' +
                '}';
    }
}
