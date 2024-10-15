package com.example.demo.Rooms;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.Component.ApiRequestClient;

@Service
public class RoomsService {

    private final String baseUrl = "https://api.100ms.live/v2/";

    @Autowired
    private RoomsRepository roomsRepository;

    @Autowired
    private RoomDataRepository roomDataRepository;

    @Autowired
    private ApiRequestClient apiRequestClient;

    @Value("${management_token}")
    private String management_token;

    @Value("${template_id}")
    private String template_id;

    public Rooms createRoom(String userId){
        String name = userId + new Date().getTime();

        RoomPayloadDTO payload = new RoomPayloadDTO(
            name,
            userId,
            template_id
        );

        Map<String, String> queryParams = new HashMap<>();

        Rooms room = apiRequestClient.sendPostRequest(
            baseUrl + "/rooms",
            payload,
            queryParams,
            Rooms.class,
            management_token
        );


        RoomDataList roomDataList = apiRequestClient.sendPostRequest(
            baseUrl + "/room-codes/room/" + room.getId(),
            null,
            queryParams,
            RoomDataList.class,
            management_token
        );

        // System.out.println(roomDataList.getData());
        System.out.println(roomDataList.getData().get(0).getRoomId());
        System.out.println(roomDataList.getData().get(1).getRoomId());

        RoomData hostRoomData = roomDataRepository.save(roomDataList.getData().get(0));
        RoomData guestRoomData = roomDataRepository.save(roomDataList.getData().get(1));

        room.setHostRoom(hostRoomData);
        room.setGuestRoom(guestRoomData);

        // System.out.println(room);

        return roomsRepository.save(room);
    }

    public List<Rooms> getRooms(String userId){
        return roomsRepository.findByCustomerId(userId);
    }

    public RoomData getRoomHostData(String userId, String roomId){
        Rooms room = roomsRepository.findByIdAndCustomerId(roomId, userId);
        return room.getHostRoom();
    }

    public RoomData getRoomGuestData(String userId, String roomId){
        Rooms room = roomsRepository.findByIdAndCustomerId(roomId, userId);
        return room.getGuestRoom();
    }

    public Rooms getRoom(String userId, String roomId){
        return roomsRepository.findByIdAndCustomerId(roomId, userId);
    }
}
