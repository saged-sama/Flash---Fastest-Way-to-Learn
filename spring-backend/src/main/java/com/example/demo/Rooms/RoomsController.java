package com.example.demo.Rooms;

import java.util.List;

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

    @GetMapping("/records")
    public ResponseEntity<List<Rooms>> getRooms(@RequestParam(required = true) String userId){
        return ResponseEntity.ok(roomsService.getRooms(userId));
    }

    @GetMapping("/records/{roomId}")
    public ResponseEntity<Rooms> getRoom(@RequestParam(required = true) String userId, @PathVariable(required = true) String roomId){
        return ResponseEntity.ok(roomsService.getRoom(userId, roomId));
    }

    @GetMapping("/records/{roomId}/room-codes/host")
    public ResponseEntity<RoomData> getRoomHostData(@RequestParam(required = true) String userId, @PathVariable(required = true) String roomId){
        return ResponseEntity.ok(roomsService.getRoomHostData(userId, roomId));
    }

    @GetMapping("/records/{roomId}/room-codes/guest")
    public ResponseEntity<RoomData> getRoomGuestData(@RequestParam(required = true) String userId, @PathVariable(required = true) String roomId){
        return ResponseEntity.ok(roomsService.getRoomGuestData(userId, roomId));
    }

    @PostMapping("/records")
    public ResponseEntity<Rooms> createRoom(String userId){
        return ResponseEntity.ok(roomsService.createRoom(userId));
    }
}
