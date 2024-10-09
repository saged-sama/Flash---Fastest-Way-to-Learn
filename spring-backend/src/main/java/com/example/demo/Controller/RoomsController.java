package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Rooms;
import com.example.demo.Service.RoomsService;

@RestController
@RequestMapping("/api/collections/rooms")
public class RoomsController {
    
    @Autowired
    private RoomsService roomsService;

    @PostMapping("/records")
    public ResponseEntity<Rooms> createRoom(String userId){
        return ResponseEntity.ok(roomsService.createRoom(userId));
    }
}