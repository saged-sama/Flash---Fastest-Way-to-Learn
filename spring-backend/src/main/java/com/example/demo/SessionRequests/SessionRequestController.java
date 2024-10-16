package com.example.demo.SessionRequests;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.example.demo.Sessions.SessionsService;
import com.example.demo.Sessions.Sessions;
import com.example.demo.Users.UsersService;
import com.example.demo.Websocket.GenericWebSocketHandler;

@Configuration
@EnableWebSocket
@RestController
@RequestMapping("/api/collections/sessionrequests")
public class SessionRequestController implements WebSocketConfigurer {

    private final String entity = "sessionrequests";

    @Autowired
    private SessionRequestsService sessionRequestsService;

    @Autowired
    private SessionsService sessionService;

    @Autowired
    private UsersService userService;

    @Autowired
    private GenericWebSocketHandler webSocketHandler;

    @GetMapping("/records")
    public ResponseEntity<List<SessionRequests>> getSessionRequests(@RequestParam String sessionId) {
        Sessions session = sessionService.getSession(sessionId);
        return ResponseEntity.ok(sessionRequestsService.getSessionRequests(session));
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<SessionRequests> getSessionRequest(@RequestParam String id) {
        return ResponseEntity.ok(sessionRequestsService.getSessionRequest(id));
    }

    @PostMapping("/records")
    public ResponseEntity<SessionRequests> createSessionRequest(@ModelAttribute SessionRequests sessionRequest, @RequestParam String userId) throws IOException {
        sessionRequest.setUser(userService.getUser(userId));
        SessionRequests createdSessionRequest = sessionRequestsService.createSessionRequest(sessionRequest);
        webSocketHandler.notifyEntityUpdate(entity, "create");
        return ResponseEntity.ok(createdSessionRequest);
    }

    @PatchMapping("/records/{id}")
    public ResponseEntity<SessionRequests> updateSessionRequest(@ModelAttribute SessionRequests sessionRequest, @PathVariable String id) throws IOException {
        SessionRequests updatedSessionRequest = sessionRequestsService.updateSessionRequest(id, sessionRequest);
        webSocketHandler.notifyEntityUpdate(entity, "update");
        return ResponseEntity.ok(updatedSessionRequest);
    }

    @SuppressWarnings("null")
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/ws/" + entity)
                .setAllowedOrigins("*");
    }

}
