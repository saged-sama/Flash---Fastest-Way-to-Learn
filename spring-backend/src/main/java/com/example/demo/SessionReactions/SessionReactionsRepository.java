package com.example.demo.SessionReactions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionReactionsRepository extends JpaRepository<SessionReactions, String>, JpaSpecificationExecutor<SessionReactions> {
    @Query("SELECT sr FROM SessionReactions sr WHERE sr.session.id = :sessionId AND sr.user.id = :userId")
    SessionReactions findBySessionAndUser(String sessionId, String userId);
}
