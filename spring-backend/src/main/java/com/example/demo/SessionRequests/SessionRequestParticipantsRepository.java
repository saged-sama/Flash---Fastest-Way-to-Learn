package com.example.demo.SessionRequests;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRequestParticipantsRepository extends JpaRepository<SessionRequestParticipants, String>, JpaSpecificationExecutor<SessionRequestParticipants> {

    List<SessionRequestParticipants> findBySessionRequest(SessionRequests sessionRequest);
    
}
