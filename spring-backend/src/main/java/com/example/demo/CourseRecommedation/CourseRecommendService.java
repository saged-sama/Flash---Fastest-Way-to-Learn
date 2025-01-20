package com.example.demo.CourseRecommedation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.Courses.Course;
import com.example.demo.Courses.CourseService;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseRecommendService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CourseService courseService;

    public List<Course> predictedCourseService(CourseFeature feature) {
        String courseName = feature.getCourse_name();

     //   String url = "http://localhost:8080/api/collections/course/all";

        // Fetch all courses from the provided URL
        // List<Course> courses;
        // try {
        //     courses = restTemplate.exchange(
        //         url,
        //         org.springframework.http.HttpMethod.GET,
        //         null,
        //         new ParameterizedTypeReference<List<Course>>() {}
        //     ).getBody();
        // } catch (Exception e) {
        //     throw new RuntimeException("Failed to fetch courses from URL: " + url, e);
        // }

        // if (courses == null || courses.isEmpty()) {
        //     throw new RuntimeException("No courses found at the provided URL");
        // }

        // // Serialize the courses to JSON or another format the Python script understands
        // String coursesJson;
        // try {
        //     coursesJson = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(courses);
        // } catch (Exception e) {
        //     throw new RuntimeException("Error serializing courses to JSON", e);
        // }

    

        

        String pythonScriptPath = "/Users/eyasir2047/Desktop/All in one/3-2 Project/Flash/Flash---Fastest-Way-to-Learn/spring-backend/src/main/java/com/example/CourseRecommedPython/predictContentBased.py";

       
        //endpoint -> fastapi (http request) 

        //  System.out.println("MLLLLLL");
        // Create the process builder to execute the Python script
       // ProcessBuilder processBuilder = new ProcessBuilder("python3", pythonScriptPath, courseName,coursesJson);
       ProcessBuilder processBuilder = new ProcessBuilder("python3", pythonScriptPath, courseName);
        processBuilder.redirectErrorStream(true); // Combine standard error and output

        List<Course> output = new ArrayList<Course>();

        try {
            // Start the process
           Process process = processBuilder.start();

            // Read the output of the script
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.add(courseService.getCourseByTitle(line));
                }
            }

            // Wait for the process to complete
            int exitCode = process.waitFor();
           if (exitCode != 0) {
               throw new RuntimeException("Python script exited with code: " + exitCode);
           }

        } catch (Exception e) {
            throw new RuntimeException("Error occurred while executing Python script", e);
        }

        // Check if output is empty
        if (output.toString().trim().isEmpty()) {
            throw new RuntimeException("Empty output from Python script");
        }


        return output;
    }
}


// Plan - course create - pkl update (even driven)
//5 -10 min ar pore pore with debouncing technique, better  
//collaborative (hybrid)

//Yeamin - chatbot (Gemini AI) 

