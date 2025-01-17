package com.example.demo.Websocket;

public class WebSocketMessagePayload {
    public String messageType;
    public String topic;
    public String action;

    public WebSocketMessagePayload(String messageType, String topic, String action) {
        this.messageType = messageType;
        this.topic = topic;
        this.action = action;
    }

    public WebSocketMessagePayload() {
    }

    public String getMessageType() {
        return messageType;
    }   

    public void setMessageType(String messageType) {
        this.messageType = messageType;
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

    @Override
    public String toString() {
        return "WebSocketMessagePayload{" +
                "messageType='" + messageType + '\'' +
                ", topic='" + topic + '\'' +
                ", action='" + action + '\'' +
                '}';
    }
}
