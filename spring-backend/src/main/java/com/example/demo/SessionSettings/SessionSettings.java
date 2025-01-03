package com.example.demo.SessionSettings;

import com.example.demo.Users.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Data;

@Data
@Entity
@Builder
public class SessionSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Users user;

    private String sessionBanner;

    private String aboutSessionOwner;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ScheduledSessionBehavior scheduledSessionBehavior = ScheduledSessionBehavior.ASK;

    @Builder.Default
    private Long notifyScheduledSessionBefore = 5L;
    @Builder.Default
    private boolean notifyThroughEmail = true;

    @Min(value = 1)
    @Max(value = 5)
    @Builder.Default
    private int maximumAllowedParticipantsPerRoom = 3;

    @Builder.Default
    private boolean canViewWaitingList = true;
    @Builder.Default
    private boolean canViewParticipantsList = true;
    @Builder.Default
    private boolean canViewCurrentSessionParticipants = false;
    @Builder.Default
    private boolean displaySessionStatistics = true;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getSessionBanner() {
        return sessionBanner;
    }

    public void setSessionBanner(String sessionBanner) {
        this.sessionBanner = sessionBanner;
    }

    public String getAboutSessionOwner() {
        return aboutSessionOwner;
    }

    public void setAboutSessionOwner(String aboutSessionOwner) {
        this.aboutSessionOwner = aboutSessionOwner;
    }

    public ScheduledSessionBehavior getScheduledSessionBehavior() {
        return scheduledSessionBehavior;
    }

    public void setScheduledSessionBehavior(ScheduledSessionBehavior scheduledSessionBehavior) {
        this.scheduledSessionBehavior = scheduledSessionBehavior;
    }

    public Long getNotifyScheduledSessionBefore() {
        return notifyScheduledSessionBefore;
    }

    public void setNotifyScheduledSessionBefore(Long notifyScheduledSessionBefore) {
        this.notifyScheduledSessionBefore = notifyScheduledSessionBefore;
    }

    public boolean isNotifyThroughEmail() {
        return notifyThroughEmail;
    }

    public void setNotifyThroughEmail(boolean notifyThroughEmail) {
        this.notifyThroughEmail = notifyThroughEmail;
    }

    public int getMaximumAllowedParticipantsPerRoom() {
        return maximumAllowedParticipantsPerRoom;
    }

    public void setMaximumAllowedParticipantsPerRoom(int maximumAllowedParticipantsPerRoom) {
        this.maximumAllowedParticipantsPerRoom = maximumAllowedParticipantsPerRoom;
    }

    public boolean isCanViewWaitingList() {
        return canViewWaitingList;
    }

    public void setCanViewWaitingList(boolean canViewWaitingList) {
        this.canViewWaitingList = canViewWaitingList;
    }

    public boolean isCanViewParticipantsList() {
        return canViewParticipantsList;
    }

    public void setCanViewParticipantsList(boolean canViewParticipantsList) {
        this.canViewParticipantsList = canViewParticipantsList;
    }

    public boolean isCanViewCurrentSessionParticipants() {
        return canViewCurrentSessionParticipants;
    }

    public void setCanViewCurrentSessionParticipants(boolean canViewCurrentSessionParticipants) {
        this.canViewCurrentSessionParticipants = canViewCurrentSessionParticipants;
    }

    public boolean isDisplaySessionStatistics() {
        return displaySessionStatistics;
    }

    public void setDisplaySessionStatistics(boolean displaySessionStatistics) {
        this.displaySessionStatistics = displaySessionStatistics;
    }
}

enum ScheduledSessionBehavior {
    AUTOMATIC,
    ASK
}