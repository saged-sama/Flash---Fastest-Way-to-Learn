package com.example.demo.SessionRequests;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Sessions.Sessions;

@Repository
public interface SessionRequestsRepository extends JpaRepository<SessionRequests, String> {
    public List<SessionRequests> findBySession(Sessions session);
    public List<SessionRequests> findBySessionOrderByCreatedAtDesc(Sessions session);
}
