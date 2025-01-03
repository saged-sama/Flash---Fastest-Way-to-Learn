package com.example.demo.Sessions;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Auth.AuthUtils;
import com.example.demo.Users.Users;

@RestController
@RequestMapping("/api/collections/sessions")
public class SessionsController {

    @SuppressWarnings("unused")
    private final String entity = "sessions";
    
    @Autowired
    private SessionsService sessionService;

    @GetMapping("/records")
    public ResponseEntity<List<Sessions>> getSessions() {
        return ResponseEntity.ok(sessionService.getSessions());
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<Sessions> getSession(@PathVariable String id) {
        Sessions session = sessionService.getSession(id);
        return ResponseEntity.ok(session);
    }

    @PostMapping("/records")
    public ResponseEntity<Sessions> createSession(@ModelAttribute Sessions session) throws IOException {
        if(session.getTitle().isEmpty() || session.getTitle().isEmpty() || "".equals(session.getTitle()) || "".equals(session.getTitle())) {
            return ResponseEntity.badRequest().build();
        }

        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if(user == null) {
            return ResponseEntity.badRequest().build();
        }

        session.setOwner(user);
        Sessions createdSession = sessionService.createSession(session);
        return ResponseEntity.ok(createdSession);
    }
}
