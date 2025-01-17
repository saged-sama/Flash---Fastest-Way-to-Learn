package com.example.demo.SessionRequests;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.Users.Users;
import com.example.demo.Utilities.QueryFilters;

@Service
public class SessionRequestParticipantsService {
    @Autowired
    private SessionRequestParticipantsRepository sessionRequestParticipantsRepository;

    @Autowired
    private SessionRequestsService sessionRequestsService;

    public SessionRequestParticipants createSessionRequestParticipant(SessionRequestParticipants sessionRequestParticipants) {
        return sessionRequestParticipantsRepository.save(sessionRequestParticipants);
    }

    public void deleteSessionRequestParticipant(String sessionRequestParticipantId) {
        sessionRequestParticipantsRepository.deleteById(sessionRequestParticipantId);
    }

    public SessionRequestParticipants getSessionRequestParticipant(String sessionRequestParticipantId) {
        return sessionRequestParticipantsRepository.findById(sessionRequestParticipantId).orElse(null);
    }

    public Page<SessionRequestParticipants> getSessionRequestParticipants(int page, int perPage, String sort, String filter) {
        Pageable pageable = PageRequest.of(page, page, QueryFilters.parseSort(sort));
        QueryFilters<SessionRequestParticipants> queryFilters = new QueryFilters<>();
        Page<SessionRequestParticipants> sessionRequestParticipants = sessionRequestParticipantsRepository.findAll(queryFilters.buildSpecification(filter), pageable);
        return sessionRequestParticipants;
    }

    public List<SessionRequestParticipants> getSessionRequestParticipantsBySessionRequest(String sessionRequestId) {
        return sessionRequestParticipantsRepository.findBySessionRequest(sessionRequestsService.getSessionRequest(sessionRequestId));
    }

    public SessionRequestParticipants updateSessionRequestParticipant(String sessionRequestParticipantId, SessionRequestParticipants sessionRequestParticipant, Users user) {
        SessionRequestParticipants existingSessionRequestParticipant = sessionRequestParticipantsRepository.findById(sessionRequestParticipantId).orElse(null);
        if(existingSessionRequestParticipant == null || existingSessionRequestParticipant.getSessionRequest().getUser().getId() != user.getId()){
            return null;
        }

        return sessionRequestParticipantsRepository.save(sessionRequestParticipant);
    }   
}
