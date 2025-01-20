package com.example.demo.CourseInteractions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.example.demo.Courses.Course;
import com.example.demo.Users.Users;

@Repository
public interface CourseInteractionsRepository extends JpaRepository<CourseInteractions, String> {
    Optional<CourseInteractions> findByCourseIdAndUserId(String courseId, String userId);
   

    @Query(value = "SELECT ci.course_id, ci.count FROM course_interactions ci ORDER BY ci.count DESC LIMIT 1", nativeQuery = true)
    Optional<Object[]> findMostInteractedCourse();

 }
