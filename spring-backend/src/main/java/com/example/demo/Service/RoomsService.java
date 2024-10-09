package com.example.demo.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.Component.ApiRequestClient;
import com.example.demo.DTO.RoomPayload;
import com.example.demo.Entity.Rooms;
import com.example.demo.Repository.RoomsRepository;

@Service
public class RoomsService {

    private final String baseUrl = "https://api.100ms.live/v2/rooms";

    @Autowired
    private RoomsRepository roomsRepository;

    @Autowired
    private ApiRequestClient apiRequestClient;

    @Value("${management_token}")
    private String management_token;

    @Value("${template_id}")
    private String template_id;

    public Rooms createRoom(String userId){
        String name = userId + new Date().getTime();

        RoomPayload payload = new RoomPayload(
            name,
            userId,
            template_id
        );

        Map<String, String> queryParams = new HashMap<>();

        Rooms room = apiRequestClient.sendPostRequest(
            baseUrl,
            payload,
            queryParams,
            Rooms.class,
            management_token
        );

        System.out.println(room);

        return roomsRepository.save(room);
    }
}
