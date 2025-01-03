package com.example.demo.SessionSettings;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Users.Users;

@Repository
public interface SessionSettingsRepository extends JpaRepository<SessionSettings, String> {
    Optional<SessionSettings> findByUser(Users user);

    @Query("SELECT s FROM SessionSettings s WHERE s.user = :user")
    List<SessionSettings> findManyByUser(Users user);

    @Query("SELECT s FROM SessionSettings s WHERE (:user IS NULL OR s.user = :user)")
    Page<SessionSettings> findPageByFilters(String user, Pageable pageable);

    @Query("SELECT s FROM SessionSettings s WHERE (:user IS NULL OR s.user = :user)")
    Slice<SessionSettings> findSliceByFilters(Users user, Pageable pageable);
}
