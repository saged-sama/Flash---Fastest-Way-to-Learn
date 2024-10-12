package com.example.demo.Websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Conditional;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload Object payload, MessageHeaders headers) {
        String destination = (String) headers.get("destination");
        simpMessagingTemplate.convertAndSend(destination, payload);
    }

    public void updateNotification(Object payload, String destination) {
        simpMessagingTemplate.convertAndSend(destination, payload);
    }
    
}
