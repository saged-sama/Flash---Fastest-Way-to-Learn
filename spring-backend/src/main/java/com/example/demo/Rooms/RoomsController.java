package com.example.demo.Rooms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/collections/rooms")
public class RoomsController {
    
    @Autowired
    private RoomsService roomsService;

    @GetMapping("/records/{sessionRequestId}")
    public ResponseEntity<Rooms> getRoom(@PathVariable String sessionRequestId){
        return ResponseEntity.ok(roomsService.getRoom(sessionRequestId));
    }

    @GetMapping("/records/roomdata/{roomId}")
    public ResponseEntity<RoomData> getRoomHostData(@RequestParam(required = true) String userId, @PathVariable String roomId){
        return ResponseEntity.ok(roomsService.getRoomData(userId, roomId));
    }

    @GetMapping("/records/room-auth-token/{roomCode}")
    public ResponseEntity<RoomData> getRoomAuthToken(@RequestParam(required = true) String userId, @PathVariable(required = true) String roomCode){
        return ResponseEntity.ok(roomsService.getRoomAuthToken(userId, roomCode));
    }

    @PostMapping("/records")
    public ResponseEntity<Rooms> createRoom(@RequestParam String userId, @RequestParam String sessionRequestId){
        System.out.println(userId + " " + sessionRequestId);
        return ResponseEntity.ok(roomsService.createRoom(userId, sessionRequestId));
    }
}
