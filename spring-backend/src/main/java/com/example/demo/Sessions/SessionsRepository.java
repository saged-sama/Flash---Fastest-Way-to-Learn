package com.example.demo.Sessions;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Users.Users;

@Repository
public interface SessionsRepository extends JpaRepository<Sessions, String> {

    public List<Sessions> findByOwnerAndState(Users user, SessionState state);
    public List<Sessions> findByOwner(Users user);
}
