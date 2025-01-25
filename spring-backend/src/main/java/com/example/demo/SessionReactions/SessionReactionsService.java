package com.example.demo.SessionReactions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.demo.Sessions.SessionsRepository;
import com.example.demo.Users.Users;
import com.example.demo.Users.UsersRepository;
import com.example.demo.Utilities.QueryFilters;
import com.example.demo.Utilities.Reactions;

@Service
public class SessionReactionsService {
    @Autowired
    private SessionReactionsRepository sessionReactionsRepository;

    @Autowired
    private SessionsRepository sessionsRepository;

    @Autowired
    private UsersRepository usersRepository;

    public SessionReactions createSessionReaction(SessionReactionsDto sessionReactionDto) {
        synchronized(this){
            SessionReactions existingSessionReaction = sessionReactionsRepository.findBySessionAndUser(sessionReactionDto.getSessionId(), sessionReactionDto.getUserId());
            if(existingSessionReaction != null){
                deleteSessionReaction(existingSessionReaction.getId());
            }
        }
        SessionReactions sessionReaction = new SessionReactions();
        sessionReaction.setSession(sessionsRepository.findById(sessionReactionDto.getSessionId()).orElse(null));
        sessionReaction.setUser(usersRepository.findById(sessionReactionDto.getUserId()).orElse(null));
        sessionReaction.setReaction(Reactions.valueOf(sessionReactionDto.getReaction().toUpperCase()));
        return sessionReactionsRepository.save(sessionReaction);
    }

    public SessionReactions getSessionReaction(String sessionReactionId) {
        return sessionReactionsRepository.findById(sessionReactionId).orElse(null);
    }

    public Page<SessionReactions> getSessionReactions(int page, int perPage, String sort, String filter) {
        Pageable pageable = PageRequest.of(page-1, perPage, QueryFilters.parseSort(sort));
        QueryFilters<SessionReactions> queryFilters = new QueryFilters<>();
        Specification<SessionReactions> spec = queryFilters.buildSpecification(filter);
        return sessionReactionsRepository.findAll(spec, pageable);
    }

    public SessionReactions updateSessionReaction(SessionReactions sessionReaction, Users user) {
        if(!user.getId().equals(sessionReaction.getUser().getId())){
            return null;
        }
        return sessionReactionsRepository.save(sessionReaction);
    }

    public void deleteSessionReaction(String sessionReactionId) {
        sessionReactionsRepository.deleteById(sessionReactionId);
    }
}
