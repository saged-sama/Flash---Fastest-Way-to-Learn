package com.example.demo.Sessions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.Users.UsersService;
import com.example.demo.Utilities.QueryFilters;

@Service
public class SessionParticipantsService {
    @Autowired
    private SessionParticipantsRepository sessionParticipantsRepository;

    @Autowired
    private SessionsService sessionsService;

    @Autowired
    private UsersService usersService;

    public SessionParticipants createSessionParticipant(SessionParticipantDto sessionParticipantsDto) {
        SessionParticipants newSessionParticipant = new SessionParticipants();
        newSessionParticipant.setSession(sessionsService.getSession(sessionParticipantsDto.getSessionId()));
        newSessionParticipant.setUsers(usersService.getUser(sessionParticipantsDto.getUserId()));
        newSessionParticipant.setStatus(SessionParticipantStatus.valueOf(sessionParticipantsDto.getStatus()));

        return sessionParticipantsRepository.save(newSessionParticipant);
    }

    public void deleteSessionParticipant(String sessionParticipantId) {
        sessionParticipantsRepository.deleteById(sessionParticipantId);
    }

    public SessionParticipants getSessionParticipant(String sessionParticipantId) {
        return sessionParticipantsRepository.findById(sessionParticipantId).orElse(null);
    }

    public Page<SessionParticipants> getSessionParticipants(int page, int perPage, String sort, String filter) {
        Pageable pageable = PageRequest.of(page, perPage, QueryFilters.parseSort(sort));
        QueryFilters<SessionParticipants> queryFilters = new QueryFilters<>();
        Page<SessionParticipants> sessionParticipants = sessionParticipantsRepository.findAll(queryFilters.buildSpecification(filter), pageable);
        return sessionParticipants;
    }

    public SessionParticipants updateSessionParticipant(String sessionParticipantId, SessionParticipantDto sessionParticipant) {
        SessionParticipants existingSessionParticipant = sessionParticipantsRepository.findById(sessionParticipantId).orElse(null);
        if(existingSessionParticipant == null) {
            return null;
        }

        if(sessionParticipant.getSessionId() != null) {
            existingSessionParticipant.setSession(sessionsService.getSession(sessionParticipant.getSessionId()));
        }
        if(sessionParticipant.getUserId() != null) {
            existingSessionParticipant.setUsers(usersService.getUser(sessionParticipant.getUserId()));
        }
        if(sessionParticipant.getStatus() != null) {
            existingSessionParticipant.setStatus(SessionParticipantStatus.valueOf(sessionParticipant.getStatus()));
        }

        return sessionParticipantsRepository.save(existingSessionParticipant);
    }
}
