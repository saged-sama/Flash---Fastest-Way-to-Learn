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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class SessionSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Users user;

    private String sessionBanner;

    private String aboutSessionOwner;

    @Enumerated(EnumType.STRING)
    private ScheduledSessionBehavior scheduledSessionBehavior;

    private Long notifyScheduledSessionBefore;
    private boolean notifyThroughEmail;

    @Min(value = 1)
    @Max(value = 5)
    private int maximumAllowedParticipantsPerRoom;

    private boolean canViewWaitingList;
    private boolean canViewParticipantsList;
    private boolean canViewCurrentSessionParticipants;
    private boolean displaySessionStatistics;
    // Private constructor for the Builder
    private SessionSettings(Builder builder) {
        this.id = builder.id;
        this.user = builder.user;
        this.sessionBanner = builder.sessionBanner;
        this.aboutSessionOwner = builder.aboutSessionOwner;
        this.scheduledSessionBehavior = builder.scheduledSessionBehavior;
        this.notifyScheduledSessionBefore = builder.notifyScheduledSessionBefore;
        this.notifyThroughEmail = builder.notifyThroughEmail;
        this.maximumAllowedParticipantsPerRoom = builder.maximumAllowedParticipantsPerRoom;
        this.canViewWaitingList = builder.canViewWaitingList;
        this.canViewParticipantsList = builder.canViewParticipantsList;
        this.canViewCurrentSessionParticipants = builder.canViewCurrentSessionParticipants;
        this.displaySessionStatistics = builder.displaySessionStatistics;
    }

    public static class Builder {
        private String id;
        private Users user;
        private String sessionBanner;
        private String aboutSessionOwner;
        private ScheduledSessionBehavior scheduledSessionBehavior = ScheduledSessionBehavior.ASK;
        private Long notifyScheduledSessionBefore = 5L;
        private boolean notifyThroughEmail = true;
        private int maximumAllowedParticipantsPerRoom = 3;
        private boolean canViewWaitingList = true;
        private boolean canViewParticipantsList = true;
        private boolean canViewCurrentSessionParticipants = false;
        private boolean displaySessionStatistics = true;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder user(Users user) {
            this.user = user;
            return this;
        }

        public Builder sessionBanner(String sessionBanner) {
            this.sessionBanner = sessionBanner;
            return this;
        }

        public Builder aboutSessionOwner(String aboutSessionOwner) {
            this.aboutSessionOwner = aboutSessionOwner;
            return this;
        }

        public Builder scheduledSessionBehavior(ScheduledSessionBehavior scheduledSessionBehavior) {
            this.scheduledSessionBehavior = scheduledSessionBehavior;
            return this;
        }

        public Builder notifyScheduledSessionBefore(Long notifyScheduledSessionBefore) {
            this.notifyScheduledSessionBefore = notifyScheduledSessionBefore;
            return this;
        }

        public Builder notifyThroughEmail(boolean notifyThroughEmail) {
            this.notifyThroughEmail = notifyThroughEmail;
            return this;
        }

        public Builder maximumAllowedParticipantsPerRoom(int maximumAllowedParticipantsPerRoom) {
            this.maximumAllowedParticipantsPerRoom = maximumAllowedParticipantsPerRoom;
            return this;
        }

        public Builder canViewWaitingList(boolean canViewWaitingList) {
            this.canViewWaitingList = canViewWaitingList;
            return this;
        }

        public Builder canViewParticipantsList(boolean canViewParticipantsList) {
            this.canViewParticipantsList = canViewParticipantsList;
            return this;
        }

        public Builder canViewCurrentSessionParticipants(boolean canViewCurrentSessionParticipants) {
            this.canViewCurrentSessionParticipants = canViewCurrentSessionParticipants;
            return this;
        }

        public Builder displaySessionStatistics(boolean displaySessionStatistics) {
            this.displaySessionStatistics = displaySessionStatistics;
            return this;
        }

        public SessionSettings build() {
            return new SessionSettings(this);
        }
    }
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
