package com.example.demo.Sessions;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.example.demo.Users.UsersService;
import com.example.demo.Websocket.GenericWebSocketHandler;

@Configuration
@EnableWebSocket
@RestController
@RequestMapping("/api/collections/sessions")
public class SessionsController implements WebSocketConfigurer {

    private final String entity = "sessions";
    
    @Autowired
    private SessionsService sessionService;

    @Autowired
    private UsersService userService;

    @Autowired
    private GenericWebSocketHandler webSocketHandler;

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
    public ResponseEntity<Sessions> createSession(@ModelAttribute Sessions session, @RequestParam String userId) throws IOException {

        session.setOwner(userService.getUser(userId));
        Sessions createdSession = sessionService.createSession(session);
        webSocketHandler.notifyEntityUpdate(entity, "create");
        return ResponseEntity.ok(createdSession);
    }

    @SuppressWarnings("null")
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/ws/" + entity)
            .setAllowedOrigins("*");
    }
}
