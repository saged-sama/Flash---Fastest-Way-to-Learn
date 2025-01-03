package com.example.demo.Purchase;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseRespository extends JpaRepository<Purchase, String> {
    @Query("SELECT p FROM Purchase p WHERE p.user.id = :userId AND p.course.id = :courseId")
    List<Purchase> findPurchasesByUserAndCourse(
        @Param("userId") String userId, 
        @Param("courseId") String courseId
    );

    @Query("SELECT p FROM Purchase p WHERE p.user.id = :userId")
    List<Purchase> findPurchasesByUser(
        @Param("userId") String userId
    );
}
