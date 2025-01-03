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
import lombok.Builder;
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
}

enum ScheduledSessionBehavior {
    AUTOMATIC,
    ASK
}