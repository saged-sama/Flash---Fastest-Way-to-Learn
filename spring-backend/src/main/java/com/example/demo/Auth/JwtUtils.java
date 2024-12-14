package com.example.demo.Auth;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.demo.Users.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
    @Value("${jwt_secret}")
    private String secret;

    public String generateJwtToken(Users user){

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 30L * 60 * 60 * 24 * 1000);

        return Jwts.builder()
            .claim("id", user.getId())
            .claim("name", user.getName())
            .claim("email", user.getEmail())
            .claim("avatar", user.getAvatar())
            .subject(user.getUsername())
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
            .compact();
    }

    public Claims extractAllClaims(String token){
        return Jwts.parser()
            .verifyWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public String extractUsername(String token){
        return extractAllClaims(token).getSubject();
    }

    public boolean isTokenExpired(String token){
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    public boolean isTokenValid(String token, Users user){
        return extractUsername(token).equals(user.getUsername()) && !isTokenExpired(token);
    }
}