package com.example.demo.Courses;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Categories.CategoryService;
import com.example.demo.Users.UsersService;

@Configuration
@RestController
@RequestMapping("/api/collections/course")
public class CourseConroller {
    @Autowired
    private CourseService courseService;
    
    @Autowired
    private UsersService userService;

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/records")
    public ResponseEntity<CourseDTO> createCourse(@RequestParam String title, @RequestParam String userId) throws IOException {
        System.out.println("Title: " + title);
        Course course = Course.builder().title(title).isPublished(false).price(0.0f).build();
        course.setOwner(userService.getUser(userId));
        Course createdCourse = courseService.createCourse(course);
        return ResponseEntity.ok(new CourseDTO(createdCourse));
    }

    @GetMapping("/records/{courseId}")
    public ResponseEntity<CourseDTO> getCourse(@PathVariable String courseId) {
        Course course = courseService.getCourse(courseId);
        return ResponseEntity.ok(new CourseDTO(course));
    }

    @GetMapping("/records")
    public ResponseEntity<List<CourseDTO>> getCourses() {
        List<Course> courses = courseService.getCourses();
        List<CourseDTO> courseDTOs = new ArrayList<CourseDTO>();
        for (Course course : courses) {
            courseDTOs.add(new CourseDTO(course));
        }
        return ResponseEntity.ok(courseDTOs);
    }

    @PatchMapping("/records/{courseId}")
    public ResponseEntity<CourseDTO> updateCourse(@ModelAttribute CourseUpdateDTO courseUpdateDTO, @PathVariable String courseId, @RequestParam String userId) {
        Course existingCourse = courseService.getCourse(courseId);
        if (existingCourse == null) {
            return null;
        }

        if (courseUpdateDTO.getTitle() != null) {
            existingCourse.setTitle(courseUpdateDTO.getTitle());
        }
        if (courseUpdateDTO.getDescription() != null) {
            existingCourse.setDescription(courseUpdateDTO.getDescription());
        }
        if (courseUpdateDTO.getCategoryId() != null) {
            existingCourse.setCategory(categoryService.getCategory(courseUpdateDTO.getCategoryId()));
        }
        if (courseUpdateDTO.getImageUrl() != null) {
            existingCourse.setImageUrl(courseUpdateDTO.getImageUrl());
        }
        if (courseUpdateDTO.getPrice() != null) {
            existingCourse.setPrice(courseUpdateDTO.getPrice());
        }
        if (courseUpdateDTO.getIsPublished() != null) {
            existingCourse.setIsPublished(courseUpdateDTO.getIsPublished());
        }

        return ResponseEntity.ok(new CourseDTO(courseService.updateCourse(existingCourse)));
    }
}
