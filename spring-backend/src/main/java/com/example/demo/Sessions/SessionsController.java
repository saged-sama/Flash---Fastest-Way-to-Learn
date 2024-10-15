package com.example.demo.Sessions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Users.UsersService;
import com.example.demo.Users.Users;

@RestController
@RequestMapping("/api/collections/sessions")
public class SessionsController {
    
    @Autowired
    private SessionsService sessionService;

    @Autowired
    private UsersService userService;

    @GetMapping("/records")
    public ResponseEntity<List<Sessions>> getSessions(@RequestParam String userId) {
        Users user = userService.getUser(userId);
        return ResponseEntity.ok(sessionService.getSessions(user));
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<Sessions> getSession(@PathVariable String sessionId) {
        Sessions session = sessionService.getSession(sessionId);
        return ResponseEntity.ok(session);
    }

    @PostMapping("/records")
    public ResponseEntity<Sessions> createSession(@ModelAttribute Sessions session, @RequestParam String userId) {

        session.setOwner(userService.getUser(userId));

        return ResponseEntity.ok(sessionService.createSession(session));
    }
}
