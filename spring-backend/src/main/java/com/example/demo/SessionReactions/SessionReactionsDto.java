package com.example.demo.SessionReactions;

import lombok.Data;
@Data
public class SessionReactionsDto {
    private String sessionId;
    private String userId;
    private String reaction;

    public SessionReactionsDto(String sessionId, String userId, String reaction) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.reaction = reaction;
    }

    public SessionReactionsDto() {
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getReaction() {
        return reaction;
    }

    public void setReaction(String reaction) {
        this.reaction = reaction;
    }

    @Override
    public String toString() {
        return "SessionReactionsDto{" +
                "sessionId='" + sessionId + '\'' +
                ", userId='" + userId + '\'' +
                ", reaction='" + reaction + '\'' +
                '}';
    }
}
