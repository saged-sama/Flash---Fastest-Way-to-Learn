package com.example.demo.Resources;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.demo.Users.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Resource {
    @Id
    @GeneratedValue(
        strategy = GenerationType.UUID
    )
    private String id;

    @ManyToOne
    @JoinColumn(
        name = "owner_id",
        nullable = false
    )
    private Users owner;

    @Column(
        nullable = false,
        columnDefinition = "TEXT"
    )
    private String title;

    @Column(
        nullable = false,
        columnDefinition = "TEXT"
    )
    private String description;

    @Column(
        nullable = false,
        columnDefinition = "TEXT"
    )
    private String topic;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "resource_status")
    private ResourceStatus status;

    @Column(
        nullable = false
    )
    private Long upvote;

    @Column(
        nullable = false
    )
    private Long downvote;

    @Column(
        nullable = false
    )
    private Boolean sharable;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
