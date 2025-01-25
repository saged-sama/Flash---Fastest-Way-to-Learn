package com.example.demo.Sessions;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.demo.Users.Users;
import com.example.demo.Utilities.EntityUpdate;
import com.example.demo.Utilities.QueryFilters;

@Service
public class SessionsService {


    @Autowired
    private SessionsRepository sessionRepository;

    public List<Sessions> getManyByUser(Users user){
        return sessionRepository.findByOwner(user);
    }

    public List<Sessions> getManyActiveByUser(Users user){
        return sessionRepository.findByOwnerAndState(user, SessionState.STARTED);
    }   

    public boolean isAnyOngoing(Users user){
        List<Sessions> sessions = getManyActiveByUser(user);
        return sessions.size() > 0;
    }

    public Sessions createSession(Sessions session) {
        if(session.getState().equals(SessionState.STARTED) && isAnyOngoing(session.getOwner())){
            return null;
        }

        if(session.getState().equals(SessionState.STARTED)){
            session.setStartTime(LocalDateTime.now());
            session.setEndTime(session.getStartTime());
        }

        return sessionRepository.save(session);
    }

    public Sessions getSession(String sessionId) {
        return sessionRepository.findById(sessionId).orElse(null);
    }

    public Page<Sessions> getSessions(int page, int perPage, String sort, String filter) {
        Pageable pageable = PageRequest.of(page - 1, perPage, QueryFilters.parseSort(sort));
        QueryFilters<Sessions> queryFilters = new QueryFilters<>();
        Specification<Sessions> spec = queryFilters.buildSpecification(filter);

        return sessionRepository.findAll(spec, pageable);
    }

    public Sessions updateSession(String sessionId, Sessions session, Users user) {
        Sessions existingSession = getSession(sessionId);

        if(!user.getId().equals(existingSession.getOwner().getId())){
            return null;
        }

        SessionState state = session.getState();
        if(state != null && state.equals(SessionState.STARTED)){
            if(!existingSession.getState().equals(state)){
                session.setStartTime(LocalDateTime.now());
            }
            else{
                session.setStartTime(existingSession.getStartTime());
            }
        }
        if(state != null && state.equals(SessionState.ENDED)){
            if(!existingSession.getState().equals(state)){
                session.setEndTime(LocalDateTime.now());
            }
            else{
                session.setEndTime(existingSession.getEndTime());
            }
        }
        EntityUpdate.merge(existingSession, session);
        return sessionRepository.save(existingSession);
    }   
}
