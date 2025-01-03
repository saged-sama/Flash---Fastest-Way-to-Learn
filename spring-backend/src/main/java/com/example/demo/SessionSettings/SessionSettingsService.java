package com.example.demo.SessionSettings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Files.FileHandler;
import com.example.demo.Users.Users;
import com.example.demo.Utilities.EntityUpdate;

@Service
public class SessionSettingsService {
    @Autowired
    private SessionSettingsRepository sessionSettingsRepository;

    @Autowired
    private FileHandler fileHandler;

    private String tableName = "sessionsettings";

    public SessionSettings createSessionSettings(SessionSettings sessionSettings, MultipartFile sessionBannerFile, MultipartFile sessionDisplayPhotoFile){
        SessionSettings newSessionSettings = sessionSettingsRepository.save(sessionSettings);

        if(newSessionSettings != null){
            if(sessionBannerFile != null){
                String sessionBanner = fileHandler.saveFile(sessionBannerFile, tableName, newSessionSettings.getId());
                newSessionSettings.setSessionBanner(sessionBanner);
            }
        }

        return sessionSettingsRepository.save(newSessionSettings);
    }

    private SessionSettings createDefaultSettings(Users user){
        return SessionSettings.builder()
            .user(user)
            .aboutSessionOwner("About the session owner")
            .scheduledSessionBehavior(ScheduledSessionBehavior.ASK)
            .notifyScheduledSessionBefore(5L)
            .notifyThroughEmail(true)
            .maximumAllowedParticipantsPerRoom(3)
            .canViewWaitingList(true)
            .canViewParticipantsList(true)
            .canViewCurrentSessionParticipants(false)
            .build();
    }

    public Iterable<SessionSettings> getAllSessionSettings(Users user){
        Iterable<SessionSettings> list = sessionSettingsRepository.findManyByUser(user);
        if(list == null || !list.iterator().hasNext()){
            SessionSettings defaultSettings = createDefaultSettings(user);
            sessionSettingsRepository.save(defaultSettings);
            list = sessionSettingsRepository.findManyByUser(user);
        }
        return list;
    }

    public SessionSettings getSessionSettings(String id){
        return sessionSettingsRepository.findById(id).orElse(null);
    }

    public SessionSettings updateSessionSettings(SessionSettings sessionSettings, MultipartFile sessionBannerFile, MultipartFile sessionDisplayPhotoFile){
        SessionSettings existingSessionSettings = sessionSettingsRepository.findById(sessionSettings.getId()).orElse(null);

        if(existingSessionSettings == null){
            return null;
        }

        EntityUpdate.merge(existingSessionSettings, sessionSettings);

        if(sessionBannerFile != null){
            String sessionBanner = fileHandler.saveFile(sessionBannerFile, tableName, existingSessionSettings.getId());
            existingSessionSettings.setSessionBanner(sessionBanner);
        }

        return sessionSettingsRepository.save(existingSessionSettings);
    }
}