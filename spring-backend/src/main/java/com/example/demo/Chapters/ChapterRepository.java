package com.example.demo.Chapters;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Courses.Course;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, String> {
    List<Chapter> findByCourse(Course course);

    @Query("SELECT c FROM Chapter c WHERE c.course = :course ORDER BY c.position DESC LIMIT 1")
    Optional<Chapter> getHighestChapterPosition(Course course);

    @Query("SELECT c FROM Chapter c WHERE c.course = :course AND c.isPublished = TRUE")
    List<Chapter> getPublishedChapters(Course course);

    @Query("""
            SELECT c
            FROM Chapter c
            WHERE c.course.id = (
                SELECT ch.course.id
                FROM Chapter ch
                WHERE ch.id = :currentChapterId
            )
            AND c.position > (
                SELECT ch.position
                FROM Chapter ch
                WHERE ch.id = :currentChapterId
            )
            ORDER BY c.position ASC
            """)
    List<Chapter> findNextChapterByCurrentChapterId(@Param("currentChapterId") String currentChapterId);

}
