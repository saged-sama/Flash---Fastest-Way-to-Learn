package com.example.demo.SessionSettings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Auth.AuthUtils;
import com.example.demo.Users.Users;

@RequestMapping("/api/collections/sessionsettings")
@RestController
public class SessionSettingsController {

    @Autowired
    private SessionSettingsService sessionSettingsService;

    @GetMapping("/records")
    public ResponseEntity<Iterable<SessionSettings>> getRecords(){

        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());

        if(user == null){
            return ResponseEntity.badRequest().build();
        }

        Iterable<SessionSettings> sessionSettings = sessionSettingsService.getAllSessionSettings(user);
        if(sessionSettings == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(sessionSettings);
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<SessionSettings> getRecord(String id){
        SessionSettings sessionSettings = sessionSettingsService.getSessionSettings(id);
        if(sessionSettings == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(sessionSettings);
    }

    @PostMapping("/records")
    public ResponseEntity<SessionSettings> createRecord(
        @ModelAttribute SessionSettings sessionSettings,
        @RequestParam(required = false) MultipartFile sessionBannerFile,
        @RequestParam(required = false) MultipartFile sessionDisplayPhotoFile
    ){
        SessionSettings newSessionSettings = sessionSettingsService.createSessionSettings(sessionSettings, sessionBannerFile, sessionDisplayPhotoFile);
        if(newSessionSettings == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(newSessionSettings);
    }

    @PatchMapping("/records/{id}")
    public ResponseEntity<SessionSettings> updateRecord(
        @ModelAttribute SessionSettings sessionSettings,
        @RequestParam(required = false) MultipartFile sessionBannerFile,
        @RequestParam(required = false) MultipartFile sessionDisplayPhotoFile
    ){
        SessionSettings updatedSessionSettings = sessionSettingsService.updateSessionSettings(sessionSettings, sessionBannerFile, sessionDisplayPhotoFile);
        if(updatedSessionSettings == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(updatedSessionSettings);
    }
}
