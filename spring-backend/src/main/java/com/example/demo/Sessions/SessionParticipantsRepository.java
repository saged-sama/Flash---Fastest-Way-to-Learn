package com.example.demo.Sessions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionParticipantsRepository extends JpaRepository<SessionParticipants, String>, JpaSpecificationExecutor<SessionParticipants>{
    
}
