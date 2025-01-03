package com.example.demo.StripeCustomer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Users.Users;

@Repository
public interface  StripeCustomerRepository extends JpaRepository<StripeCustomer, String> {
    StripeCustomer findByUser(Users user);
}
