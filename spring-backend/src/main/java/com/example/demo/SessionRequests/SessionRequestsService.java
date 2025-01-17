package com.example.demo.SessionRequests;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.demo.Rooms.Rooms;
import com.example.demo.Rooms.RoomsService;
import com.example.demo.Users.Users;
import com.example.demo.Utilities.EntityUpdate;
import com.example.demo.Utilities.QueryFilters;

@Service
public class SessionRequestsService {

    @Autowired
    private RoomsService roomsService;

    @Autowired
    private SessionRequestsRepository sessionRequestsRepository;

    public SessionRequests createSessionRequest(SessionRequests sessionRequest) {
        SessionRequests newSessionRequest = sessionRequestsRepository.save(sessionRequest);
        return newSessionRequest;
    }

    public Page<SessionRequests> getSessionRequests(int page, int perPage, String sort, String filter) {
        Pageable pageable = PageRequest.of(page - 1, perPage, QueryFilters.parseSort(sort));
        QueryFilters<SessionRequests> queryFilters = new QueryFilters<>();
        Specification<SessionRequests> specification = queryFilters.buildSpecification(filter);
        Page<SessionRequests> sessionRequests = sessionRequestsRepository.findAll(specification, pageable);
        return sessionRequests;
    }

    public SessionRequests getSessionRequest(String sessionRequestId) {
        return sessionRequestsRepository.findById(sessionRequestId).orElse(null);
    }

    public SessionRequests updateSessionRequest(String sessionRequestId, SessionRequests sessionRequest, Users user) {
        SessionRequests existingSessionRequest = sessionRequestsRepository.findById(sessionRequestId).orElse(null);
        Users sessionOwner = existingSessionRequest.getSession().getOwner();

        if(!user.getId().equals(sessionOwner.getId())){
            return null;
        }

        if(user.getId().equals(sessionOwner.getId())){
            @SuppressWarnings("unused")
            Rooms room = roomsService.createRoom(existingSessionRequest.getUser().getId(), existingSessionRequest.getId());
            EntityUpdate.merge(existingSessionRequest, sessionRequest);
        }

        return sessionRequestsRepository.save(existingSessionRequest);
    }

    public void deleteSessionRequest(String sessionId) {
        sessionRequestsRepository.deleteById(sessionId);
    }
}
