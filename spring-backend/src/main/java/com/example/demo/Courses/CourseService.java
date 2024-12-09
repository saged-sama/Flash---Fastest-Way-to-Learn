package com.example.demo.Courses;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course getCourse(String courseId) {
        return courseRepository.findById(courseId).orElse(null);
    }

    public List<Course> getCourses() {
        return courseRepository.findAll();
    }
}
