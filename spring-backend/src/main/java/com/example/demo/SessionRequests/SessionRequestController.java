package com.example.demo.SessionRequests;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Sessions.SessionsService;
import com.example.demo.Sessions.Sessions;
import com.example.demo.Users.UsersService;

@RestController
@RequestMapping("/api/collections/sessionrequests")
public class SessionRequestController{

    @SuppressWarnings("unused")
    private final String entity = "sessionrequests";

    @Autowired
    private SessionRequestsService sessionRequestsService;

    @Autowired
    private SessionsService sessionService;

    @Autowired
    private UsersService userService;

    @GetMapping("/records")
    public ResponseEntity<List<SessionRequests>> getSessionRequests(@RequestParam String sessionId) {
        Sessions session = sessionService.getSession(sessionId);
        return ResponseEntity.ok(sessionRequestsService.getSessionRequests(session));
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<SessionRequests> getSessionRequest(@PathVariable String id) {
        return ResponseEntity.ok(sessionRequestsService.getSessionRequest(id));
    }

    @PostMapping("/records")
    public ResponseEntity<SessionRequests> createSessionRequest(
        @ModelAttribute SessionRequests sessionRequest, 
        @RequestParam(required = true) String sessionId, 
        @RequestParam(required = true) String userId
    ) throws IOException {
        System.out.println(userId + " " + sessionId);
        sessionRequest.setSession(sessionService.getSession(sessionId));
        sessionRequest.setUser(userService.getUser(userId));
        SessionRequests createdSessionRequest = sessionRequestsService.createSessionRequest(sessionRequest);
        return ResponseEntity.ok(createdSessionRequest);
    }

    @PatchMapping("/records/{id}")
    public ResponseEntity<SessionRequests> updateSessionRequest(@ModelAttribute SessionRequests sessionRequest, @PathVariable String id) throws IOException {
        System.out.println(sessionRequest.getStatus());
        SessionRequests updatedSessionRequest = sessionRequestsService.updateSessionRequest(id, sessionRequest);
        return ResponseEntity.ok(updatedSessionRequest);
    }
}
