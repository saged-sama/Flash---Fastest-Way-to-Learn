package com.example.demo.SessionRequests;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Auth.AuthUtils;
import com.example.demo.Users.Users;
import com.example.demo.Utilities.PageableResponseBuilder;

@RestController
@RequestMapping("/api/collections/sessionrequestparticipants")
public class SessionRequestParticipantsController {
    
    @Autowired
    private SessionRequestParticipantsService sessionRequestParticipantsService;

    @GetMapping("/records")
    public ResponseEntity<Map<String, Object>> getSessionRequestParticipants(
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

        Page<SessionRequestParticipants> result = sessionRequestParticipantsService.getSessionRequestParticipants(page, perPage, sort, filter);

        if(result == null) {
            return ResponseEntity.notFound().build();
        }

        PageableResponseBuilder<SessionRequestParticipants> builder = new PageableResponseBuilder<>();
        return ResponseEntity.ok(builder.buildResponseMap(result, skipTotal));
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<SessionRequestParticipants> getSessionRequestParticipant(@PathVariable String id) {
        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if(user == null){
            return ResponseEntity.badRequest().build();
        }

        SessionRequestParticipants sessionRequestParticipant = sessionRequestParticipantsService.getSessionRequestParticipant(id);
        if(sessionRequestParticipant == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(sessionRequestParticipant);
    }

    @PostMapping("/records")
    public ResponseEntity<SessionRequestParticipants> createSessionRequestParticipant(
        @ModelAttribute SessionRequestParticipants sessionRequestParticipant
    ) {
        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if(user == null){
            return ResponseEntity.badRequest().build();
        }

        SessionRequestParticipants newSessionRequestParticipant = sessionRequestParticipantsService.createSessionRequestParticipant(sessionRequestParticipant);
        if(newSessionRequestParticipant == null){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(newSessionRequestParticipant);
    }
}
