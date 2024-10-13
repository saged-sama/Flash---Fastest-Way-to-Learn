package com.example.demo.Websocket;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;

@Component
public class WebSocketHandlerClass extends TextWebSocketHandler {

    private final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @SuppressWarnings("null")
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        session.sendMessage(new TextMessage("Yo Connected"));
        sessions.add(session);
    }

    @SuppressWarnings("null")
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        
    }

    // @SuppressWarnings("null")
    // @Override
    // public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
    //     System.err.println("Error occurred: " + exception.getMessage());
    //     session.close(CloseStatus.SERVER_ERROR);
    //     sessions.remove(session);
    // }

    @SuppressWarnings("null")
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        sessions.remove(session);
    }

    // @Override
    // public boolean supportsPartialMessages() {
    //     return false;
    // }

    public void broadcast(String message) {
        for (WebSocketSession session : sessions) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
