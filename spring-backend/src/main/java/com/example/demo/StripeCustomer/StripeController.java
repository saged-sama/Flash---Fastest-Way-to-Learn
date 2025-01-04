package com.example.demo.StripeCustomer;

import com.example.demo.Auth.AuthUtils;
import com.example.demo.Courses.Course;
import com.example.demo.Courses.CourseService;
import com.example.demo.Purchase.PurchaseService;
import com.example.demo.Users.Users;
import com.example.demo.Users.UsersService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/collections/stripe_customer")
public class StripeController {

    @Autowired
    private StripeCustomerService stripeCustomerService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private UsersService userService;

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping("/records")
    public ResponseEntity<StripeResponse> createCheckoutSession(
            @RequestParam String courseId) {
        try {
            Course course = courseService.getCourse(courseId);

            if (course == null) {
                throw new RuntimeException("Course not found");
            }

            Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
            if (user == null) {
                return ResponseEntity.badRequest().build();
            }

            StripeResponse response = stripeCustomerService.checkoutProducts(course, user);

            if ("SUCCESS".equals(response.getStatus())) {
                purchaseService.createPurchase(user, course);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            StripeResponse errorResponse = StripeResponse.builder()
                    .status("ERROR")
                    .message(e.getMessage())
                    .build();
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
