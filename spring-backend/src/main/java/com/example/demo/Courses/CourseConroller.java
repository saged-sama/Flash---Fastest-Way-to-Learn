package com.example.demo.Courses;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Users.UsersService;

@Configuration
@RestController
@RequestMapping("/api/collections/course")
public class CourseConroller {
    @Autowired
    private CourseService courseService;
    
    @Autowired
    private UsersService userService;

    @PostMapping("/records")
    public ResponseEntity<Course> createCourse(@ModelAttribute Course course, @RequestParam String userId) throws IOException {

        course.setOwner(userService.getUser(userId));
        Course createdCourse = courseService.createCourse(course);
        return ResponseEntity.ok(createdCourse);
    }
}
