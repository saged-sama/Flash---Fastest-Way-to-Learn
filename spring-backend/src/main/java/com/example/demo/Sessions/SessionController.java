package com.example.demo.Sessions;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/collections/sessions")
public class SessionController {
    
    @GetMapping("/records")
    public String getSessions(SessionsDTO sessionsDTO) {
        return "Sessions";
    }
}
