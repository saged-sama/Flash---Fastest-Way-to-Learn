package com.example.demo.CourseInteractions;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Optional;



@RestController
@RequestMapping("/api/collections/courseinteractions")
public class CourseInteractionsController {

    @Autowired
    private CourseInteractionsService courseInteractionsService;

    @PostMapping("/records")
    public ResponseEntity<CourseInteractions> createInteraction(@RequestBody CourseInteractionsDto dto) {
        System.out.println("Received DTO: " + dto);
        CourseInteractions interaction = courseInteractionsService.createOrUpdateInteraction(dto);
        return ResponseEntity.ok(interaction);
    }

  //  Get the most interacted course
    @GetMapping("/most-interacted-course")
    public ResponseEntity<Object[]> getMostInteractedCourse() {
        Optional<Object[]> result = courseInteractionsService.getMostInteractedCourse();
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // @GetMapping("/records")
    // public ResponseEntity<Map<String, Object>> getAllPaginated(
    //     @RequestParam(value = "page", defaultValue = "1", required = false) int page,
    //     @RequestParam(value = "perPage", defaultValue = "30", required = false) int perPage,
    //     @RequestParam(value = "sort", defaultValue = "", required = false) String sort,
    //     @RequestParam(value = "filter", defaultValue = "", required = false) String filter,
    //     @RequestParam(value = "skipTotal", defaultValue = "false", required = false) boolean skipTotal
    // ) {
    //     Page<CourseInteractions> courseInteractions = courseInteractionsService.getCourseInteractions(page, perPage, sort, filter);
        
    // }
    // @GetMapping("/records")
    // public List<CourseInteractions> getAll() {
    //     return courseInteractionsService.getAllCourseInteractions();
    // }
    
    
    // @GetMapping("/records/{id}")
    // public ResponseEntity<CourseInteractions> getMethodName(@PathVariable String id) {
    //     return ResponseEntity.ok(courseInteractionsService.getCourseInteraction(id));
    // }
    
    // @PostMapping("/records")
    // public ResponseEntity<CourseInteractions> postMethodName(@ModelAttribute CourseInteractionsDto courseInteractions) {
    //     System.out.println("CourseInteractions: " + courseInteractions);
    //     return ResponseEntity.ok(courseInteractionsService.createCourseInteraction(courseInteractions));
    // }


}
