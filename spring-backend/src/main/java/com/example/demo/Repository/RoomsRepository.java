package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Rooms;

@Repository
public interface RoomsRepository extends JpaRepository<Rooms, String> {
    
}
