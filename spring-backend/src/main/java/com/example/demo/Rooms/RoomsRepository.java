package com.example.demo.Rooms;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.SessionRequests.SessionRequests;

@Repository
public interface RoomsRepository extends JpaRepository<Rooms, String> {
    public Rooms findByIdAndCustomerId(String Id, String customerId);
    public List<Rooms> findByCustomerId(String customerId);
    public Rooms findBySessionRequest(SessionRequests sessionRequest);
}
