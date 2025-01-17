package com.example.demo.Websocket;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.ObjectMapper;

public class WebSocketController implements WebSocketHandler {
    private final WebSocketService webSocketService = WebSocketService.getInstance();

    @SuppressWarnings("null")
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String clientId = session.getId();
        webSocketService.addSession(clientId, session);
    }

    @SuppressWarnings("null")
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String payload = message.getPayload().toString();

        ObjectMapper objectMapper = new ObjectMapper();
        WebSocketMessagePayload webSocketMessagePayload;

        try{
            webSocketMessagePayload = objectMapper.readValue(payload, WebSocketMessagePayload.class);
            if("subscribe".equals(webSocketMessagePayload.getMessageType())){
                webSocketService.addSubscription(session.getId(), webSocketMessagePayload.getTopic(), webSocketMessagePayload.getAction());
            }
            else if("unsubscribe".equals(webSocketMessagePayload.getMessageType())){
                webSocketService.removeSubscription(session.getId(), webSocketMessagePayload.getTopic(), webSocketMessagePayload.getAction());
            }
        } catch(Exception e){
            e.printStackTrace();
        }
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
}
