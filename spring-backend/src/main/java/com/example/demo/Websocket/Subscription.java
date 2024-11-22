package com.example.demo.Websocket;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class Subscription {
    private final Map<String, Set<String>> topics;

    public Subscription() {
        topics = new ConcurrentHashMap<>();
    }

    @SuppressWarnings("unused")
    public void addSubscription(String topic, String action) {
        topics.computeIfAbsent(topic, k -> ConcurrentHashMap.newKeySet()).add(action);
    }

    @SuppressWarnings("unused")
    public void removeSubscription(String topic, String action) {
        topics.computeIfPresent(topic, (key, actions) -> {
            actions.remove(action);
            return actions.isEmpty() ? null : actions;
        });
    }

    public boolean isSubscribed(String topic, String action) {
        return topics.containsKey(topic) && topics.get(topic).contains(action);
    }

    public Map<String, Set<String>> getTopics() {
        return topics;
    }
}
