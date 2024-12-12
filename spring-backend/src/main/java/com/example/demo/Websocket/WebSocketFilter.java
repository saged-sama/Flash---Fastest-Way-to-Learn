package com.example.demo.Websocket;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class WebSocketFilter extends OncePerRequestFilter {
    
    private final WebSocketService webSocketService = WebSocketService.getInstance();

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        filterChain.doFilter(request, response);

        String topic = request.getRequestURI();
        String message = request.getMethod();
        String action = getAction(message);

        int statusCode = response.getStatus();

        webSocketService.broadcast(topic, action, "{\"status\":\"" + statusCode + "\"}");
    }

    private String getAction(String method){
        switch(method){
            case "GET":
                return "read";
            case "POST":
                return "create";
            case "PATCH":
                return "update";
            case "DELETE":
                return "delete";
            default:
                return "default";
        }
    }
}
