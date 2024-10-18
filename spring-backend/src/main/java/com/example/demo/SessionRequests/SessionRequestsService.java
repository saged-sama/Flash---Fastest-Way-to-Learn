package com.example.demo.SessionRequests;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Rooms.Rooms;
import com.example.demo.Rooms.RoomsService;
import com.example.demo.Sessions.Sessions;
import com.example.demo.Utilities.EntityUpdate;

@Service
public class SessionRequestsService {

    @Autowired
    private RoomsService roomsService;

    @Autowired
    private SessionRequestsRepository sessionRequestsRepository;

    public SessionRequests createSessionRequest(SessionRequests sessionRequest) {
        return sessionRequestsRepository.save(sessionRequest);
    }

    public List<SessionRequests> getSessionRequests(Sessions session) {
        return sessionRequestsRepository.findBySession(session);
    }

    public SessionRequests getSessionRequest(String sessionRequestId) {
        return sessionRequestsRepository.findById(sessionRequestId).orElse(null);
    }

    public SessionRequests updateSessionRequest(String sessionId, SessionRequests sessionRequest) {
        SessionRequests existingSession = sessionRequestsRepository.findById(sessionId).orElse(null);
        if(existingSession.getStatus().equals(SessionRequests.Status.PENDING) && sessionRequest.getStatus().equals(SessionRequests.Status.ACCEPTED)){
            @SuppressWarnings("unused")
            Rooms room = roomsService.createRoom(existingSession.getUser().getId(), existingSession.getId());
        }   

        EntityUpdate.merge(existingSession, sessionRequest);

        return sessionRequestsRepository.save(existingSession);
    }
}
