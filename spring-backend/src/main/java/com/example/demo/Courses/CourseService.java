package com.example.demo.Courses;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Users.Users;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course getCourse(String courseId) {
        return courseRepository.findById(courseId).orElse(null);
    }

    public Course getCourseByTitle(String courseTitle){
        System.out.println(courseTitle);
        List<Course> lis = courseRepository.findManyByTitle(courseTitle );
        if(lis.isEmpty()){
            return null;
        }
        return lis.get(0);
    }

    public List<Course> getCourses(Boolean published, String categoryId, String title) {
        if (published) {
            if (categoryId != null && title == null) {
                System.out.println(categoryId);
                return courseRepository.findPublishedCoursesByCategory(categoryId);
            } else if (categoryId == null && title != null) {
                System.out.println(title);
                return courseRepository.findPublishedCoursesByTitle(title);
            } else if (categoryId != null && title != null) {
                return courseRepository.findPublishedCoursesByCategoryAndTitle(categoryId, title);
            }
            return courseRepository.findPublishedCourses();
        }
        else {
            return courseRepository.findAll();
        }
    }

    public List<Course> getCoursesByOwner(Users user) {
        return courseRepository.findByOwner(user);
    }

    public Course updateCourse(Course course) {
        return courseRepository.save(course);
    }

    public void deleteCourse(String courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new IllegalArgumentException("Chapter with ID " + courseId + " does not exist");
        }
        courseRepository.deleteById(courseId);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
}
