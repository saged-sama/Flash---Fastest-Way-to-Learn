package com.example.demo.SessionReactions;

import com.example.demo.Sessions.Sessions;
import com.example.demo.Users.Users;
import com.example.demo.Utilities.Reactions;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
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
@Table(
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"session_id", "user_id"})
    }
)
public class SessionReactions {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Sessions session;

    @ManyToOne
    private Users user;

    @Enumerated(EnumType.STRING)
    private Reactions reaction;
}
