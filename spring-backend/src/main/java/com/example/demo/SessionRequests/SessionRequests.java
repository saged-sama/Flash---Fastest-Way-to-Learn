package com.example.demo.SessionRequests;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.demo.Sessions.Sessions;
import com.example.demo.Users.Users;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class SessionRequests {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Sessions session;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    private String description;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum Status {
        PENDING, ACCEPTED, REJECTED, CANCELLED, FINISHED
    }

    public Status status = Status.PENDING;

    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public void setStatus(Status status){
        this.status = status;
    }

    public Status getStatus(){
        return status;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getDescription(){
        return description;
    }

    public void setUser(Users user){
        this.user = user;
    }

    public Users getUser(){
        return user;
    }
    
    public void setSession(Sessions session){
        this.session = session;
    }

    public Sessions getSession(){
        return session;
    }
}
