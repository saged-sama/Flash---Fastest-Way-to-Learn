package com.example.demo.SessionRequests;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Auth.AuthUtils;
import com.example.demo.Users.Users;
import com.example.demo.Utilities.PageableResponseBuilder;
import com.example.demo.Websocket.WebSocketService;

@RestController
@RequestMapping("/api/collections/sessionrequests")
public class SessionRequestController{

    @SuppressWarnings("unused")
    private final String entity = "sessionrequests";

    private final WebSocketService webSocketService = WebSocketService.getInstance();

    @Autowired
    private SessionRequestsService sessionRequestsService;

    @GetMapping("/records")
    public ResponseEntity<Map<String, Object>> getSessionRequests(
        @RequestParam(value = "page", required = false, defaultValue = "1") int page,
        @RequestParam(value = "perPage", required = false, defaultValue = "30") int perPage,
        @RequestParam(value = "sort", required = false) String sort,
        @RequestParam(value = "filter", required = false) String filter,
        @RequestParam(value = "skipTotal", required = false, defaultValue = "true") Boolean skipTotal
    ) {
        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if(user == null){
            return ResponseEntity.badRequest().build();
        }

        Page<SessionRequests> result = sessionRequestsService.getSessionRequests(page, perPage, sort, filter);
        if(result == null) {
            return ResponseEntity.notFound().build();
        }

        PageableResponseBuilder<SessionRequests> builder = new PageableResponseBuilder<>();
        return ResponseEntity.ok(builder.buildResponseMap(result, skipTotal));
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<SessionRequests> getSessionRequest(@PathVariable String id) {
        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if(user == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(sessionRequestsService.getSessionRequest(id));
    }

    @PostMapping("/records")
    public ResponseEntity<SessionRequests> createSessionRequest(
        @ModelAttribute SessionRequests sessionRequest
        // @RequestParam(required = false) List<SessionRequestParticipants> sessionRequestParticipants
    ) throws IOException {

        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if(user == null){
            return ResponseEntity.badRequest().build();
        }

        // SessionSettings sessionSettings = sessionSettingsService.getSessionSettings(user.getId());
        // if(sessionSettings == null || sessionSettings.getMaximumAllowedParticipantsPerRoom() < sessionRequestParticipants.size()){
        //     return ResponseEntity.badRequest().build();
        // }

        sessionRequest.setUser(user);
        SessionRequests createdSessionRequest = sessionRequestsService.createSessionRequest(sessionRequest);
        if(createdSessionRequest == null){
            return ResponseEntity.badRequest().build();
        }

        // for(SessionRequestParticipants participant: sessionRequestParticipants){
        //     participant.setSessionRequest(createdSessionRequest);
        //     sessionRequestParticipantsService.createSessionRequestParticipant(participant);
        // }

        return ResponseEntity.ok(createdSessionRequest);
    }

    @PatchMapping("/records/{id}")
    public ResponseEntity<SessionRequests> updateSessionRequest(@PathVariable String id, @ModelAttribute SessionRequests sessionRequest) throws IOException {
        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if(user == null){
            return ResponseEntity.badRequest().build();
        }
        SessionRequests updatedSessionRequest = sessionRequestsService.updateSessionRequest(id, sessionRequest, user);
        if(updatedSessionRequest == null){
            return ResponseEntity.badRequest().build();
        }
        // webSocketService.broadcast("/api/collections/sessionrequests/records/" + id, "update", "{\"status\":\"" + "200" + "\"}");
        return ResponseEntity.ok(updatedSessionRequest);
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<String> deleteSessionRequest(@PathVariable String id) {
        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if(user == null){
            return ResponseEntity.badRequest().build();
        }
        sessionRequestsService.deleteSessionRequest(id);
        return ResponseEntity.ok("Session Request Deleted");
    } 
}
