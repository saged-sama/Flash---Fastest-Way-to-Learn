package com.example.demo.Websocket;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

@RestController
@RequestMapping("/realtime")
public class WebSocketController implements WebSocketHandler {
    private final WebSocketService webSocketService = WebSocketService.getInstance();

    @SuppressWarnings("null")
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Map<String, String> params = session.getUri().getQuery() != null ? splitQuery(session.getUri().getQuery()) : null;

        if (params != null && params.containsKey("clientId")) {
            webSocketService.addSession(params.get("clientId"), session);
        }
        else{
            session.close(CloseStatus.NOT_ACCEPTABLE);
        }
    }

    @SuppressWarnings("null")
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        System.out.println("Message received: " + message.getPayload());
    }

    @SuppressWarnings("null")
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.err.println("Transporter error: " + exception.getMessage());
    }

    @SuppressWarnings("null")
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        webSocketService.removeSession(session.getId(), closeStatus);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    private Map<String, String> splitQuery(String query) {
        return Map.of(query.split("=")[0], query.split("=")[1]);
    }
    
    @GetMapping("/")
    public ResponseEntity<Subscription> getSubscription(@RequestParam String clientId) {
        return ResponseEntity.ok(webSocketService.getSubscription(clientId));
    }


}
