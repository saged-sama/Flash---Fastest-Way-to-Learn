package com.example.demo.SessionReactions;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Utilities.PageableResponseBuilder;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/collections/sessionreactions")
public class SessionReactionsController {
    
    @Autowired
    private SessionReactionsService sessionReactionsService;

    @GetMapping("/records")
    public ResponseEntity<Map<String, Object>> getSessionReactions(
        @RequestParam(value = "page", required = false, defaultValue = "1") int page,
        @RequestParam(value = "perPage", required = false, defaultValue = "30") int perPage,
        @RequestParam(value = "sort", required = false) String sort,
        @RequestParam(value = "filter", required = false) String filter,
        @RequestParam(value = "skipTotal", required = false, defaultValue = "true") Boolean skipTotal
    ) { 
        Page<SessionReactions> result = sessionReactionsService.getSessionReactions(page, perPage, sort, filter);
        if(result == null) {
            return ResponseEntity.notFound().build();
        }

        PageableResponseBuilder<SessionReactions> builder = new PageableResponseBuilder<>();

        return ResponseEntity.ok(builder.buildResponseMap(result, false));
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<SessionReactions> getSessionReaction(@RequestParam(value = "id") String id) {
        SessionReactions sessionReaction = sessionReactionsService.getSessionReaction(id);
        if(sessionReaction == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(sessionReaction);
    }

    @PostMapping("/records")
    public ResponseEntity<SessionReactions> createSessionReaction(
        @RequestBody SessionReactionsDto sessionReaction
    ) {
        System.out.println("SessionReaction: " + sessionReaction);
        SessionReactions createdSessionReaction = sessionReactionsService.createSessionReaction(sessionReaction);
        if (createdSessionReaction == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(createdSessionReaction);
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<String> deleteSessionReaction(@RequestParam(value = "id") String id) {
        sessionReactionsService.deleteSessionReaction(id);
        return ResponseEntity.ok("Deleted");
    }
}
