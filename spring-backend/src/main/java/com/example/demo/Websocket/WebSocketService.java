package com.example.demo.Websocket;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class WebSocketService {
    private static volatile WebSocketService instance;
    private final Map<String, WebSocketSession> client_session_mapping; // clientId->session
    private final Map<String, String> session_client_mapping; // sessionId->clientId
    private final Map<String, Set<String>> subscriptions; // topic:action->{clientId}

    // Track if a session is currently sending a message
    private final Map<String, Boolean> sendingInProgress;

    // Queue for each clientId to store messages that need to be sent later
    private final Map<String, Queue<String>> messageQueue;

    private WebSocketService() {
        client_session_mapping = new ConcurrentHashMap<>();
        session_client_mapping = new ConcurrentHashMap<>();
        subscriptions = new ConcurrentHashMap<>();
        sendingInProgress = new ConcurrentHashMap<>();
        messageQueue = new ConcurrentHashMap<>();
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
        client_session_mapping.put(clientId, session);
        session_client_mapping.put(session.getId(), clientId);

        if (!subscriptions.containsKey("default")) {
            subscriptions.put("default", ConcurrentHashMap.newKeySet());
        }

        subscriptions.get("default").add(clientId);

        String structuredMessage = "{\"topic\":\"default\",\"action\":\"default\",\"clientID\":\"" + clientId + "\"}";

        sendMessage(clientId, structuredMessage);
    }

    public void removeSession(String sessionId, CloseStatus closeStatus) throws IOException {
        String clientId = session_client_mapping.get(sessionId);
        client_session_mapping.remove(clientId);
        session_client_mapping.remove(sessionId);
        removeAllSubscriptionsByClientId(clientId);
    }

    public void removeAllSubscriptionsByClientId(String clientId) {
        for (String key : subscriptions.keySet()) {
            subscriptions.get(key).remove(clientId);
        }
    }

    public void addSubscription(String clientId, String topic, String action) {
        if (!subscriptions.containsKey(topic + ":" + action)) {
            subscriptions.put(topic + ":" + action, ConcurrentHashMap.newKeySet());
        }
        subscriptions.get(topic + ":" + action).add(clientId);

        String structuredMessage = "{\"topic\":\"" + topic + "\",\"action\":\"" + action + "\",\"clientID\":\""
                + clientId + "\"}";

        sendMessage(clientId, structuredMessage);

        System.out.println("Here are the subscriptions: " + subscriptions);
        System.out.println("Here are the client_session_mapping: " + client_session_mapping);
    }

    public void removeSubscription(String clientId, String topic, String action) {
        if (subscriptions.containsKey(topic + ":" + action)) {
            subscriptions.get(topic + ":" + action).remove(clientId);
        }
    }

    public void broadcast(String topic, String action, String message) {
        System.out.println("Broadcasting message: " + message + " to topic: " + topic + " with action: " + action);
        Set<String> clientIds = subscriptions.get(topic + ":" + action);

        System.err.println("Here are the client IDs: " + clientIds);

        if (clientIds == null || clientIds.isEmpty()) {
            return;
        }

        final String structuredMessage;
        if(message.startsWith("{") && message.endsWith("}")) {
            structuredMessage = "{\"topic\":\"" + topic + "\",\"action\":\"" + action + "\",\"message\":" + message
            + "}";
        }
        else structuredMessage = "{\"topic\":\"" + topic + "\",\"action\":\"" + action + "\",\"message\":\"" + message
                + "\"}";

        @SuppressWarnings("unchecked")
        CompletableFuture<Void>[] futures = new CompletableFuture[clientIds.size()];
        int index = 0;

        for (String clientId : clientIds) {
            futures[index++] = CompletableFuture.runAsync(() -> {
                sendMessage(clientId, structuredMessage);
            });
        }

        CompletableFuture.allOf(futures).join();
    }

    @SuppressWarnings("unused")
    public synchronized void sendMessage(String clientId, String message) {
        WebSocketSession session = client_session_mapping.get(clientId);

        if (session != null && session.isOpen()) {
            try {
                if (sendingInProgress.getOrDefault(clientId, false)) {
                    messageQueue.computeIfAbsent(clientId, k -> new LinkedList<>()).add(message);
                    System.out.println("Session is currently sending a message. Queueing message: " + message);
                    return;
                }

                sendingInProgress.put(clientId, true);

                session.sendMessage(new TextMessage(message));

                sendingInProgress.put(clientId, false);

                processQueue(clientId);

            } catch (Exception e) {
                e.printStackTrace();
                sendingInProgress.put(clientId, false);
            }
        }
    }

    private synchronized void processQueue(String clientId) {
        Queue<String> queue = messageQueue.get(clientId);
        if (queue != null && !queue.isEmpty()) {
            String nextMessage = queue.poll();
            sendMessage(clientId, nextMessage);
        }
    }
}
