package com.example.demo.UserProgress;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserProgressDTO {
    private String id;
    private String userId;
    private String chapterId;

    private Boolean isCompleted;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public UserProgressDTO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getChapterId() {
        return chapterId;
    }

    public void setChapterId(String chapterId) {
        this.chapterId = chapterId;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UserProgressDTO(UserProgress userProgress) {
        this.id = userProgress.getId();
        this.userId = userProgress.getUser().getId();
        this.chapterId = userProgress.getChapter().getId();
        this.isCompleted = userProgress.getIsCompleted();
        this.createdAt = userProgress.getCreatedAt();
        this.updatedAt = userProgress.getUpdatedAt();
    }
}
