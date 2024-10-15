package com.example.demo.SessionRequests;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Sessions.SessionsService;
import com.example.demo.Sessions.Sessions;
import com.example.demo.Users.UsersService;

@RestController
@RequestMapping("/api/collections/sessionrequests")
public class SessionRequestController {
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
    public ResponseEntity<SessionRequests> getSessionRequest(@RequestParam String sessionRequestId) {
        return ResponseEntity.ok(sessionRequestsService.getSessionRequest(sessionRequestId));
    }

    @PostMapping("/records")
    public ResponseEntity<SessionRequests> createSessionRequest(@ModelAttribute SessionRequests sessionRequest, @RequestParam String userId) {
        sessionRequest.setUser(userService.getUser(userId));
        return ResponseEntity.ok(sessionRequestsService.createSessionRequest(sessionRequest));
    }

    @PatchMapping("/records/{id}")
    public ResponseEntity<SessionRequests> updateSessionRequest(@ModelAttribute SessionRequests sessionRequest) {
        return ResponseEntity.ok(sessionRequestsService.updatSessionRequest(sessionRequest));
    }
}
