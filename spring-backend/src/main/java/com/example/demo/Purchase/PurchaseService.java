package com.example.demo.Purchase;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Courses.Course;
import com.example.demo.Users.Users;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRespository purchaseRepository;

    public Purchase createPurchase(Users user, Course course) {
        Purchase purchase = new Purchase(user, course);
        return purchaseRepository.save(purchase);
    }

    public List<Purchase> getPurchasesByUserAndCourse(String userId, String courseId) {
        return purchaseRepository.findPurchasesByUserAndCourse(userId, courseId);
    }

    public List<Purchase> getPurchasesByUser(String userId) {
        return purchaseRepository.findPurchasesByUser(userId);
    }
}
