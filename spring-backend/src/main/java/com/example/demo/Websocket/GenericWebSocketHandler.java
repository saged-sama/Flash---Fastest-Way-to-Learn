package com.example.demo.Websocket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import io.jsonwebtoken.io.IOException;

@Component
public class GenericWebSocketHandler extends TextWebSocketHandler {

    // Store sessions by entity type (users, posts, etc.)
    private final Map<String, List<WebSocketSession>> entitySessions = new HashMap<>();

    @SuppressWarnings("null")
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Get the entity type from the path
        String path = session.getUri().getPath();
        String entity = extractEntityFromPath(path);

        // Store the session in the appropriate list
        entitySessions.computeIfAbsent(entity, k -> new ArrayList<>()).add(session);
        session.sendMessage(new TextMessage("Connected to entity: "));
        System.out.println("Connection established for entity: " + entity);
    }

    @SuppressWarnings("null")
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // Remove session from the appropriate list
        String path = session.getUri().getPath();
        String entity = extractEntityFromPath(path);

        List<WebSocketSession> sessions = entitySessions.get(entity);
        if (sessions != null) {
            sessions.remove(session);
        }
        System.out.println("Connection closed for entity: " + entity);
    }

    @SuppressWarnings("null")
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Handle messages, if necessary (for example, broadcast to other clients)
        System.out.println("Message received from client: " + message.getPayload());
    }

    public void notifyEntityUpdate(String entity, String updateMessage) throws java.io.IOException {
        System.out.println("Notifying clients of update for entity: " + entity);
        List<WebSocketSession> sessions = entitySessions.get(entity);
        if (sessions != null) {
            TextMessage message = new TextMessage(updateMessage);
            System.out.println("Sending message to " + sessions.size() + " clients");
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    try {
                        session.sendMessage(message);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    private String extractEntityFromPath(String path) {
        // Assumes path format like "/ws/users" or "/ws/posts"
        String[] segments = path.split("/");
        return segments.length > 2 ? segments[2] : "default";
    }
}
