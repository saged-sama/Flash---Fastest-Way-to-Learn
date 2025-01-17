package com.example.demo.Sessions;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.demo.Users.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class SessionParticipants {
   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   private String id;

   @ManyToOne
   private Sessions session;

   @ManyToOne
   private Users users;

   @Enumerated(EnumType.STRING)
   private SessionParticipantStatus status = SessionParticipantStatus.ENTERED;

   @CreationTimestamp
   private LocalDateTime createdAt;

   @UpdateTimestamp
   private LocalDateTime updatedAt;

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

    public SessionParticipantStatus getStatus() {
        return status;
    }

    public void setStatus(SessionParticipantStatus status) {
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Sessions getSession() {
        return session;
    }

    public void setSession(Sessions session) {
        this.session = session;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
    
    public SessionParticipants(String id, Sessions session, Users users, SessionParticipantStatus status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.session = session;
        this.users = users;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public SessionParticipants() {
    }
}
