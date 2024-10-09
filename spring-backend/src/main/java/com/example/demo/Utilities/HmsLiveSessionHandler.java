package com.example.demo.Utilities;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;

import com.example.demo.Utilities.UtilitiesInterface.LiveSessionHandlerInterface;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class HmsLiveSessionHandler implements LiveSessionHandlerInterface {
    @Value("${access_key}")
    private String access_key;

    @Value("${app_secret}")
    private String app_secret;

    @Override
    public String generateManagementToken() {
        Map<String, Object> payload = new HashMap<>();
        payload.put("access_key", access_key);
        payload.put("type", "management");
        payload.put("version", 2);
        String token = Jwts.builder()
            .claims(payload)
            .expiration(new Date(System.currentTimeMillis() + 86400 * 1000))
            .issuedAt(Date.from(Instant.ofEpochMilli(System.currentTimeMillis() - 60000)))
            .notBefore(new Date(System.currentTimeMillis()))
            .signWith(Keys.hmacShaKeyFor(app_secret.getBytes(StandardCharsets.UTF_8))).compact();
        return token;
    }

    @Override
    public String generateClientToken(String room_id, String user_id, String role) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("access_key", access_key);
        payload.put("room_id", room_id);
        payload.put("user_id", user_id);
        payload.put("role", role);
        payload.put("type", "app");
        payload.put("version", 2);
        String token = Jwts.builder()
            .claims(payload)
            .id(UUID.randomUUID().toString())
            .expiration(new Date(System.currentTimeMillis() + 86400 * 1000))
            .issuedAt(Date.from(Instant.ofEpochMilli(System.currentTimeMillis() - 60000)))
            .notBefore(new Date(System.currentTimeMillis()))
            .signWith(Keys.hmacShaKeyFor(app_secret.getBytes(StandardCharsets.UTF_8))).compact();
        return token;
    }
}
