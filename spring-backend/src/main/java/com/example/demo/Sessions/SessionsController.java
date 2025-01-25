package com.example.demo.Sessions;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Auth.AuthUtils;
import com.example.demo.SessionSettings.SessionSettings;
import com.example.demo.SessionSettings.SessionSettingsService;
import com.example.demo.Users.Users;
import com.example.demo.Utilities.DynamicScheduler;
import com.example.demo.Utilities.EmailService;
import com.example.demo.Utilities.EmailTemplates;
import com.example.demo.Utilities.PageableResponseBuilder;

@RestController
@RequestMapping("/api/collections/sessions")
public class SessionsController {

    @SuppressWarnings("unused")
    private final String entity = "sessions";
    
    @Autowired
    private SessionsService sessionService;

    @Autowired
    private SessionSettingsService sessionSettingsService;

    @Autowired
    private DynamicScheduler scheduler;

    @Autowired
    private EmailService emailService;

    @GetMapping("/records")
    public ResponseEntity<Map<String, Object>> getSessions(
        @RequestParam(value = "page", required = false, defaultValue = "1") int page,
        @RequestParam(value = "perPage", required = false, defaultValue = "30") int perPage,
        @RequestParam(value = "sort", required = false) String sort,
        @RequestParam(value = "filter", required = false) String filter,
        @RequestParam(value = "skipTotal", required = false, defaultValue = "true") Boolean skipTotal
    ) {
        Page<Sessions> result = sessionService.getSessions(page, perPage, sort, filter);
        if(result == null) {
            return ResponseEntity.notFound().build();
        }
        System.out.println(result.getNumber());
        PageableResponseBuilder<Sessions> builder = new PageableResponseBuilder<>();
        return ResponseEntity.ok(builder.buildResponseMap(result, skipTotal));
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<Sessions> getSession(@PathVariable String id) {
        Sessions session = sessionService.getSession(id);
        return ResponseEntity.ok(session);
    }

    @PostMapping("/records")
    public ResponseEntity<Sessions> createSession(@ModelAttribute Sessions session) throws IOException {
        if(session.getTitle().isEmpty() || session.getTitle().isEmpty() || "".equals(session.getTitle()) || "".equals(session.getTitle())) {
            return ResponseEntity.badRequest().build();
        }

        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if(user == null) {
            return ResponseEntity.badRequest().build();
        }
        session.setOwner(user);

        if(session.getStartTime() == null){
            session.setState(SessionState.STARTED);
            session.setStartTime(LocalDateTime.now());
        }
        else{
            session.setState(SessionState.SCHEDULED);
        }
        Sessions createdSession = sessionService.createSession(session);
        if(createdSession == null){
            return ResponseEntity.badRequest().build();
        }

        SessionSettings sessionSettings = sessionSettingsService.getSessionSettings(user.getId());

        if(sessionSettings.isNotifyThroughEmail() && session.getStartTime() != null && session.getState().equals(SessionState.SCHEDULED)){
            Runnable task = () -> {
                try{
                    emailService.sendEmail(
                        user.getEmail(), 
                        "Scheduled Session Reminder",
                        EmailTemplates.getScheduledSessionReminderTemplate(
                            user.getName(),
                            createdSession.getTitle(),
                            createdSession.getStartTime(),
                            "http://localhost:3000/subs/sessions/" + createdSession.getId()
                        )
                    );
                }catch(Exception e){
                    e.printStackTrace();
                }
            };
            Runnable startSession = () -> {
                createdSession.setState(SessionState.STARTED);
                sessionService.updateSession(createdSession.getId(), createdSession, user);
            };

            scheduler.scheduleTask(task, createdSession.getStartTime().minusMinutes(sessionSettings.getNotifyScheduledSessionBefore()));
            scheduler.scheduleTask(startSession, createdSession.getStartTime());
            System.out.println("Scheduled task successfully");
        }

        return ResponseEntity.ok(createdSession);
    }

    @PatchMapping("/records/{id}")
    public ResponseEntity<Sessions> updateSession(@PathVariable String id, @ModelAttribute Sessions session) {
        System.out.println("Updating session state: " + session);
        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if(user == null) {
            return ResponseEntity.badRequest().build();
        }

        Sessions updatedSession = sessionService.updateSession(id, session, user);
        if(updatedSession == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(updatedSession);
    }
}
