package com.example.demo.StripeCustomer;

import com.example.demo.Courses.Course;
import com.example.demo.Users.Users;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.checkout.SessionCreateParams;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeCustomerService {

    @Value("${stripe.secretKey}")
    private String secretKey;

    @Autowired
    private StripeCustomerRepository stripeCustomerRepository;

    private Customer createStripeCustomer(Users user) throws StripeException {
        CustomerCreateParams params = CustomerCreateParams.builder()
                .setEmail(user.getEmail())
                .setName(user.getName())
                .putMetadata("userId", user.getId())
                .build();

        Customer customer = Customer.create(params);

        // Save customer in our database
        StripeCustomer stripeCustomer = new StripeCustomer(user, customer.getId());
        stripeCustomerRepository.save(stripeCustomer);

        return customer;
    }

    public StripeResponse checkoutProducts(Course course, Users user) {
        try {
            // Set your secret key
            Stripe.apiKey = secretKey;

            // Check if customer exists or create new one
            StripeCustomer stripeCustomer = stripeCustomerRepository.findByUser(user);
            String customerId;

            if (stripeCustomer == null) {
                Customer customer = createStripeCustomer(user);
                customerId = customer.getId();
            } else {
                customerId = stripeCustomer.getStripeCustomerId();
            }

            // Create product data
            SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData
                    .builder()
                    .setName(course.getTitle())
                    .setDescription(course.getDescription())
                    .build();

            // Create price data
            SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
                    .setCurrency("usd")
                    .setUnitAmount((long) (course.getPrice() * 100))
                    .setProductData(productData)
                    .build();

            // Create line item
            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                    .setQuantity(1L)
                    .setPriceData(priceData)
                    .build();

            // Create metadata
            Map<String, String> metadata = new HashMap<>();
            metadata.put("courseId", course.getId());
            metadata.put("userId", user.getId());

            // Create session parameters
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setCustomer(customerId)
                    .setSuccessUrl(
                            String.format("http://localhost:3000/course/courses/%s/payment?success=1", course.getId()))
                    .setCancelUrl(
                            String.format("http://localhost:3000/course/courses/%s/payment?success=0", course.getId()))
                    .addLineItem(lineItem)
                    .putAllMetadata(metadata)
                    .build();

            // Create session
            Session session = Session.create(params);

            return StripeResponse.builder()
                    .status("SUCCESS")
                    .message("Payment session created successfully")
                    .sessionId(session.getId())
                    .sessionUrl(session.getUrl())
                    .build();

        } catch (StripeException e) {
            return StripeResponse.builder()
                    .status("ERROR")
                    .message("Error creating payment session: " + e.getMessage())
                    .build();
        }
    }
}
