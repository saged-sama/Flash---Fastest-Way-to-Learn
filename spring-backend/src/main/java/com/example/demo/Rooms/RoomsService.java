package com.example.demo.Rooms;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.Component.ApiRequestClient;
import com.example.demo.SessionRequests.SessionRequests;
import com.example.demo.SessionRequests.SessionRequestsRepository;
import com.example.demo.Utilities.HmsLiveSessionHandler;

@Service
public class RoomsService {

    private final String baseUrl = "https://api.100ms.live/v2/";

    @Autowired
    private RoomsRepository roomsRepository;

    @Autowired
    private RoomDataRepository roomDataRepository;

    @Autowired
    private ApiRequestClient apiRequestClient;

    @Autowired
    private SessionRequestsRepository sessionRequestsRepository;
    @Autowired
    private HmsLiveSessionHandler hmsLiveSessionHandler;

    private String management_token;
    private String template_id;

    public RoomsService(@Value("${management_token}") String management_token, @Value("${template_id}") String template_id){
        this.management_token = management_token;
        this.template_id = template_id;
    }

    public Rooms createRoom(String userId, String sessionRequestId){
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

        SessionRequests sessionRequests = sessionRequestsRepository.findById(sessionRequestId).orElse(null);
        room.setSessionRequest(sessionRequests);

        RoomDataList roomDataList = apiRequestClient.sendPostRequest(
            baseUrl + "/room-codes/room/" + room.getId(),
            null,
            queryParams,
            RoomDataList.class,
            management_token
        );

        RoomData hostRoomData = roomDataRepository.save(roomDataList.getData().get(1));
        hostRoomData.setAuthToken(hmsLiveSessionHandler.generateClientToken(room.getId(), userId, "host"));
        System.out.println("host: " + hostRoomData.getRole());
        RoomData guestRoomData = roomDataRepository.save(roomDataList.getData().get(0));
        guestRoomData.setAuthToken(hmsLiveSessionHandler.generateClientToken(room.getId(), room.getSessionRequest().getUser().getId(), "guest"));
        System.out.println("guest: " + guestRoomData.getRole());
        room.setHostRoom(hostRoomData);
        room.setGuestRoom(guestRoomData);

        return roomsRepository.save(room);
    }

    public RoomData getRoomData(String userId, String roomId){
        Rooms room = roomsRepository.findById(roomId).orElse(null);

        System.out.println("host--" + room.getHostRoom().getRole());
        System.out.println("guest--" + room.getGuestRoom().getRole());

        if(room.getSessionRequest().getSession().getOwner().getId().equals(userId)){
            System.out.println("Host Room");
            return room.getHostRoom();
        }
        else if(room.getSessionRequest().getUser().getId().equals(userId)){
            return room.getGuestRoom();
        }
        return null;
    }

    public RoomData getRoomAuthToken(String userId, String roomCode){
        RoomData roomdata = roomDataRepository.findByCode(roomCode);
        return roomdata;
    }

    public Rooms getRoom(String sessionRequestId){
        SessionRequests sessionRequest = sessionRequestsRepository.findById(sessionRequestId).orElse(null);
        return roomsRepository.findBySessionRequest(sessionRequest);
    }
}
