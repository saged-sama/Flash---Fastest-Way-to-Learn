package com.example.demo.Courses;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Users.Users;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {
    List<Course> findByOwner(Users user);

    @Query("SELECT c FROM Course c WHERE c.isPublished = TRUE")
    List<Course> findPublishedCourses();

    @Query("SELECT c FROM Course c WHERE c.isPublished = TRUE AND c.category.id = :categoryId")
    List<Course> findPublishedCoursesByCategory(
            @Param("categoryId") String categoryId);

    @Query("SELECT c FROM Course c WHERE c.isPublished = TRUE AND c.title LIKE %:title%")
    List<Course> findPublishedCoursesByTitle(
            @Param("title") String title);

    @Query("SELECT c FROM Course c WHERE c.isPublished = TRUE AND c.category.id = :categoryId AND c.title LIKE %:title%")
    List<Course> findPublishedCoursesByCategoryAndTitle(
            @Param("categoryId") String categoryId,
            @Param("title") String title);

}
