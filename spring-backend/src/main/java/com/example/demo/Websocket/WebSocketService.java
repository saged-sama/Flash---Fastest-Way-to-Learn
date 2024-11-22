package com.example.demo.Websocket;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class WebSocketService {
    private static volatile WebSocketService instance;
    private final Map<String, String> session_client_mapping;
    private final Map<String, WebSocketSession> sessions;
    private final Map<String, Subscription> subscriptions;

    private WebSocketService() {
        session_client_mapping = new ConcurrentHashMap<>();
        sessions = new ConcurrentHashMap<>();
        subscriptions = new ConcurrentHashMap<>();
    }

    public static WebSocketService getInstance() {
        WebSocketService result = instance;
        if (result == null) {
            synchronized (WebSocketService.class) {
                result = instance;
                if (result == null) {
                    instance = result = new WebSocketService();
                }
            }
        }
        return result;
    }

    public void addSession(String clientId, WebSocketSession session) {
        session_client_mapping.put(session.getId(), clientId);
        sessions.put(clientId, session);
        subscriptions.putIfAbsent(clientId, new Subscription());
    }

    public void removeSession(String sessionId, CloseStatus closeStatus) throws IOException {
        String clientId = session_client_mapping.get(sessionId);
        sessions.get(clientId).close(closeStatus);
        sessions.remove(clientId);
        subscriptions.remove(clientId);
    }

    @SuppressWarnings("unused")
    public void addSubscription(String clientId, String topic, String action) {
        subscriptions.computeIfPresent(clientId, (key, subscription) -> {
            subscription.addSubscription(topic, action);
            return subscription;
        });
    }

    @SuppressWarnings("unused")
    public void removeSubscription(String clientId, String topic, String action) {
        subscriptions.computeIfPresent(clientId, (key, subscription) -> {
            subscription.removeSubscription(topic, action);
            return subscription;
        });
    }

    public void broadcast(String topic, String action, String message) {
        subscriptions.forEach((clientId, subscription) -> {
            if (subscription.isSubscribed(topic, action)) {
                WebSocketSession session = sessions.get(clientId);
                if (session != null && session.isOpen()) {
                    try {
                        session.sendMessage(new TextMessage(message));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        });
    }

    public void sendMessage(String clientId, String message) {
        WebSocketSession session = sessions.get(clientId);
        if (session != null && session.isOpen()) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public Map<String, Subscription> getAllSubscriptions() {
        return subscriptions;
    }

    public Subscription getSubscription(String clientId) {
        return subscriptions.get(clientId);
    }
}
