package com.example.demo.Sessions;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionsService {


    @Autowired
    private SessionsRepository sessionRepository;

    public Sessions createSession(Sessions session) {
        return sessionRepository.save(session);
    }

    public Sessions getSession(String sessionId) {
        return sessionRepository.findById(sessionId).orElse(null);
    }

    public List<Sessions> getSessions() {
        return sessionRepository.findAll();
    }
}
