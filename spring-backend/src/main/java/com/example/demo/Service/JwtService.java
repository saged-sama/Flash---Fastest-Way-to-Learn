package com.example.demo.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.example.demo.Users.UserRepository;
import com.example.demo.Users.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtService {

    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String jwt_secret;

    public String generateToken(Users user){
        return Jwts.builder()
                .claim("id", user.getId())
                .claim("name", user.getName())
                .claim("email", user.getEmail())
                .claim("avatar", user.getAvatar())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(Keys.hmacShaKeyFor(jwt_secret.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    private Claims extractAllClaims(String token){
        return Jwts.claims().build();
    }

    public String extractId(String token){
        return extractAllClaims(token).getId();
    }

    public Date extractExpiration(String token){
        return extractAllClaims(token).getExpiration();
    }

    public boolean verifyToken(String token){
        final String Id = extractId(token);
        return userRepository.findById(Id).isPresent() && extractExpiration(token).after(new Date(System.currentTimeMillis()));
    }
    
}
