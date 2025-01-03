package com.example.demo.Purchase;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@RestController
@RequestMapping("/api/collections/purchase")
public class PurchaseController {
    @Autowired
    private PurchaseService purchaseService;

    @GetMapping("/records/{userId}")
    public ResponseEntity<List<Purchase>> getPurchasesByUserAndCourse(
            @PathVariable String userId,
            @RequestParam(required = false) String courseId) {
        System.out.println("User id: " + userId);
        System.out.println("Course id: " + courseId);
        if (courseId != null) {
            return ResponseEntity.ok(purchaseService.getPurchasesByUserAndCourse(userId, courseId));
        } else {
            return ResponseEntity.ok(purchaseService.getPurchasesByUser(userId));
        }
    }
}
