package com.example.demo.Sessions;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionParticipantDto {
    @Nullable
    private String sessionId;
    @Nullable
    private String userId;
    @Nullable
    private String status;
}
