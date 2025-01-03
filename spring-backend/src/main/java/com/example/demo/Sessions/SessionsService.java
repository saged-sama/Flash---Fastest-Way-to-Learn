package com.example.demo.Sessions;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Users.Users;

@Service
public class SessionsService {


    @Autowired
    private SessionsRepository sessionRepository;

    public List<Sessions> getManyByUser(Users user){
        return sessionRepository.findByOwner(user);
    }

    public List<Sessions> getManyActiveByUser(Users user){
        return sessionRepository.findByOwnerAndState(user, SessionState.Started);
    }   

    public boolean isAnyOngoing(Users user){
        List<Sessions> sessions = getManyActiveByUser(user);

        return sessions.size() > 0;
    }

    public Sessions createSession(Sessions session) {
        if(isAnyOngoing(session.getOwner())){
            return null;
        }

        if(session.getState() == SessionState.Started){
            session.setStartTime(LocalDateTime.now());
            session.setEndTime(session.getStartTime());
        }
        else{
            session.setStartTime(null);
            session.setEndTime(null);
        }

        return sessionRepository.save(session);
    }

    public Sessions getSession(String sessionId) {
        return sessionRepository.findById(sessionId).orElse(null);
    }

    public List<Sessions> getSessions() {
        return sessionRepository.findAll();
    }

    public Sessions updateSession(Sessions session, Users user) {
        if(user.getId() != session.getOwner().getId()){
            return null;
        }

        Sessions existingSession = getSession(session.getId());
        SessionState state = session.getState();
        if(state.equals(SessionState.Started)){
            if(!existingSession.getState().equals(state)){
                session.setStartTime(LocalDateTime.now());
            }
            else{
                session.setStartTime(existingSession.getStartTime());
            }
        }
        if(state.equals(SessionState.Ended)){
            if(!existingSession.getState().equals(state)){
                session.setEndTime(LocalDateTime.now());
            }
            else{
                session.setEndTime(existingSession.getEndTime());
            }
        }
        
        return sessionRepository.save(session);
    }   
}
