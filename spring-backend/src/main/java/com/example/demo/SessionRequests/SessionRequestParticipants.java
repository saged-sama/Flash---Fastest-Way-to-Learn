package com.example.demo.SessionRequests;

import com.example.demo.Users.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class SessionRequestParticipants {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private SessionRequests sessionRequest;

    @ManyToOne
    private Users user;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public SessionRequests getSessionRequest() {
        return sessionRequest;
    }

    public void setSessionRequest(SessionRequests sessionRequest) {
        this.sessionRequest = sessionRequest;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public SessionRequestParticipants() {
    }
}
