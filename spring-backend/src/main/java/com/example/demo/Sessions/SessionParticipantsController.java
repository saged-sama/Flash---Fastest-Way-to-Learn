package com.example.demo.Sessions;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
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

@RestController
@RequestMapping("/api/collections/sessionparticipants")
public class SessionParticipantsController {
    private final Map<String, LocalDateTime> users = new HashMap<>();

    @Autowired
    private SessionParticipantsService sessionParticipantsService;

    @GetMapping("/records")
    public ResponseEntity<Map<String, Object>> getSessionParticipants(
        @RequestParam(value = "page", required = false, defaultValue = "1") int page,
        @RequestParam(value = "perPage", required = false, defaultValue = "30") int perPage,
        @RequestParam(value = "sort", required = false) String sort,
        @RequestParam(value = "filter", required = false) String filter,
        @RequestParam(value = "skipTotal", required = false, defaultValue = "true") Boolean skipTotal
    ) {
        Page<SessionParticipants> result = sessionParticipantsService.getSessionParticipants(page, perPage, sort, filter);
        PageableResponseBuilder<SessionParticipants> builder = new PageableResponseBuilder<>();
        return ResponseEntity.ok(builder.buildResponseMap(result, skipTotal));
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<SessionParticipants> getSessionParticipant(@PathVariable String id) {
        SessionParticipants sessionParticipant = sessionParticipantsService.getSessionParticipant(id);
        if(sessionParticipant == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(sessionParticipant);
    }

    @PostMapping("/records")
    public ResponseEntity<SessionParticipants> createSessionParticipant(@ModelAttribute SessionParticipantDto sessionParticipantDto) {

        synchronized(SessionParticipantsController.class){
            Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
            if(user == null) {
                return ResponseEntity.badRequest().build();
            }
            if(users.containsKey(user.getId())) {
                LocalDateTime lastRequest = users.get(user.getId());
                if(lastRequest.plusSeconds(5).isAfter(LocalDateTime.now())) {
                    return ResponseEntity.ok().build();
                }
            }
            users.put(user.getId(), LocalDateTime.now());

            SessionParticipants newSessionParticipant = sessionParticipantsService.createSessionParticipant(sessionParticipantDto);
            return ResponseEntity.ok(newSessionParticipant);
        }
    }

    @PatchMapping("/records/{id}")
    public ResponseEntity<SessionParticipants> updateSessionParticipant(@PathVariable String id, @ModelAttribute SessionParticipantDto sessionParticipant) {
        SessionParticipants updatedSessionParticipant = sessionParticipantsService.updateSessionParticipant(id, sessionParticipant);
        if(updatedSessionParticipant == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedSessionParticipant);
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<String> deleteSessionParticipant(@PathVariable String id) {
        sessionParticipantsService.deleteSessionParticipant(id);
        return ResponseEntity.ok("Session Participant deleted successfully");
    }
}
