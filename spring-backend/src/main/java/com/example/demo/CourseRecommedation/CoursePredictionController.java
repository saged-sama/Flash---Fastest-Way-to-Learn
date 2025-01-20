package com.example.demo.CourseRecommedation;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Courses.Course;

@RestController
@RequestMapping("/api/predict")
public class CoursePredictionController {

    @Autowired
    private  CourseRecommendService courseService;

    @PostMapping("/coursename")
    public  ResponseEntity<List<Course>> recommendedCourse(@RequestBody CourseFeature  courseFeature){
       return  ResponseEntity.ok(courseService.predictedCourseService(courseFeature));
      // return ResponseEntity.ok(List.of());
    }




}
