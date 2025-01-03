package com.example.demo.UserProgress;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Chapters.Chapter;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, String> {
    @Query("SELECT up.chapter FROM UserProgress up " +
       "WHERE up.user.id = :userId " +
       "AND up.chapter.id IN :chapterIds " +
       "AND up.isCompleted = true")
    List<Chapter> findDistinctByUserIdAndChapterIdInAndIsCompletedTrue(
            @Param("userId") String userId,
            @Param("chapterIds") List<String> chapterIds);

    @Query("SELECT up FROM UserProgress up WHERE up.user.id = :userId AND up.chapter.id = :chapterId")
    Optional<UserProgress> findByUserIdAndChapterId(@Param("userId") String userId,
            @Param("chapterId") String chapterId);

}
