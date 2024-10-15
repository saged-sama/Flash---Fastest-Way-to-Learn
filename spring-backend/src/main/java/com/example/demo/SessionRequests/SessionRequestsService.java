package com.example.demo.SessionRequests;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Sessions.Sessions;

@Service
public class SessionRequestsService {

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

    public SessionRequests updatSessionRequest(SessionRequests sessionRequest) {
        return sessionRequestsRepository.save(sessionRequest);
    }
}
