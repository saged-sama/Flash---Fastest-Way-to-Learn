package com.example.demo.Websocket;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

@RestController
@RequestMapping("/realtime")
public class WebSocketController implements WebSocketHandler {
    private final WebSocketService webSocketService = WebSocketService.getInstance();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Map<String, String> params = session.getUri().getQuery() != null ? splitQuery(session.getUri().getQuery()) : null;

        System.out.println("Connection established: " + params);

        String clientId = null;
        if(params != null) {
            clientId = params.get("clientId");
        }
        else{
            clientId = session.getId();
        }

        webSocketService.addSession(clientId, session);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        System.out.println("Message received: " + message.getPayload());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.err.println("Transporter error: " + exception.getMessage());
    }

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

    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribe(@ModelAttribute SubscriptionDto subscriptionDto) {
        webSocketService.addSubscription(
            subscriptionDto.getClientId(),
            subscriptionDto.getTopic(),
            subscriptionDto.getAction()
        );

        String structuredMessage = "{\"topic\":\"" + subscriptionDto.getTopic() + "\",\"action\":\"" + subscriptionDto.getAction() + "\",\"clientID\":\"" + subscriptionDto.getClientId() + "\"}";
        
        System.out.println("Subscribed to: " + structuredMessage);
        
        return ResponseEntity.ok(structuredMessage);
    }

    @PatchMapping("/unsubscribe")
    public void unsubscribe(String clientId, String topic, String action) {
        webSocketService.removeSubscription(clientId, topic, action);
    }
}
