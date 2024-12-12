package com.example.demo.Websocket;

import lombok.Data;

@Data
public class SubscriptionDto {
    private String topic;
    private String action;
    private String clientId;

    public SubscriptionDto(String topic, String action, String clientId) {
        this.topic = topic;
        this.action = action;
        this.clientId = clientId;
    }

    public SubscriptionDto() {
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    @Override
    public String toString() {
        return "SubscriptionDto{" +
                "topic='" + topic + '\'' +
                ", action='" + action + '\'' +
                ", clientId='" + clientId + '\'' +
                '}';
    }
}
