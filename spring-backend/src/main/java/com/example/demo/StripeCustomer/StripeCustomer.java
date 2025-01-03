package com.example.demo.StripeCustomer;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.demo.Users.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Data
@Entity
@Table(
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id"}),
        @UniqueConstraint(columnNames = {"stripe_customer_id"})
    }
)
public class StripeCustomer {
    @Id
    @GeneratedValue(
        strategy = GenerationType.UUID
    )
    private String id;

    @ManyToOne
    @JoinColumn(
        name = "user_id",
        nullable = false
    )
    private Users user;
    
    private String stripeCustomerId;

    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Default constructor
    public StripeCustomer() {
    }

    // Constructor with all fields
    public StripeCustomer(String id, Users user, String stripeCustomerId, 
                         LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.stripeCustomerId = stripeCustomerId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Constructor without ID and timestamps (useful for creating new entities)
    public StripeCustomer(Users user, String stripeCustomerId) {
        this.user = user;
        this.stripeCustomerId = stripeCustomerId;
    }

    // Getters
    public String getId() {
        return id;
    }

    public Users getUser() {
        return user;
    }

    public String getStripeCustomerId() {
        return stripeCustomerId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public void setStripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

}