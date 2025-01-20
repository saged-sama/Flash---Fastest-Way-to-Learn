package com.example.demo.Courses;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Auth.AuthUtils;
import com.example.demo.Categories.CategoryService;
import com.example.demo.Files.FileHandler;
import com.example.demo.Users.Users;
import com.example.demo.Users.UsersService;

@RestController
@RequestMapping("/api/collections/course")
public class CourseConroller {
    @Autowired
    private CourseService courseService;

    @Autowired
    private UsersService userService;

    @Autowired
    private CategoryService categoryService;

    private final FileHandler fileHandler = new FileHandler();

    private final String tablename = "course";

    @PostMapping("/records")
    public ResponseEntity<CourseDTO> createCourse(@RequestParam String title)
            throws IOException {
        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        Course course = new Course(title);
        course.setOwner(userService.getUser(user.getId()));
        Course createdCourse = courseService.createCourse(course);
        return ResponseEntity.ok(new CourseDTO(createdCourse));
    }

    @GetMapping("/records/{courseId}")
    public ResponseEntity<CourseDTO> getCourse(@PathVariable String courseId) {
        Course course = courseService.getCourse(courseId);
        return ResponseEntity.ok(new CourseDTO(course));
    }

    @GetMapping("/records")
    public ResponseEntity<List<CourseDTO>> getCourses(@RequestParam(required = false) Boolean userId,
            @RequestParam Boolean published,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String categoryId) {
        System.out.println("Inside Get Course");
        System.out.println("UserId " + userId);
        System.out.println("CategoryId " + categoryId);
        List<Course> courses = new ArrayList<Course>();
        if (userId != null && userId == true) {
            Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
            if (user == null) {
                return ResponseEntity.badRequest().build();
            }

            courses = courseService.getCoursesByOwner(user);
            for (Course course : courses) {
                System.out.println(course.getCategory());
            }
        } else {
            courses = courseService.getCourses(published, categoryId, title);
        }

        List<CourseDTO> courseDTOs = new ArrayList<>();
        for (Course course : courses) {
            courseDTOs.add(new CourseDTO(course));
        }
        return ResponseEntity.ok(courseDTOs);
    }

    @PatchMapping(value = "/records/{courseId}", consumes = "multipart/form-data")
    public ResponseEntity<CourseDTO> updateCourse(@ModelAttribute CourseUpdateDTO courseUpdateDTO,
            @PathVariable String courseId) {
        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());

        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        Course existingCourse = courseService.getCourse(courseId);
        if (existingCourse == null) {
            return ResponseEntity.badRequest().build();
        }

        System.out.println("Course update DTO: " + courseUpdateDTO.getDescription());
        System.out.println(existingCourse.getOwner().getId());
        System.out.println(user.getId());

        if (!existingCourse.getOwner().equals(user)) {
            return ResponseEntity.badRequest().build();
        }

        System.out.println("Course update DTO: " + courseUpdateDTO.getDescription());

        if (courseUpdateDTO.getTitle() != null) {
            existingCourse.setTitle(courseUpdateDTO.getTitle());
        }
        if (courseUpdateDTO.getDescription() != null) {
            existingCourse.setDescription(courseUpdateDTO.getDescription());
        }
        if (courseUpdateDTO.getCategoryId() != null) {
            existingCourse.setCategory(categoryService.getCategory(courseUpdateDTO.getCategoryId()));
        }
        if (courseUpdateDTO.getImageFile() != null) {
            String imageUrl = fileHandler.saveFile(courseUpdateDTO.getImageFile(), this.tablename,
                    existingCourse.getId());
            System.out.println("imageUrl: " + imageUrl);
            existingCourse.setImageUrl(imageUrl);
        }
        if (courseUpdateDTO.getPrice() != null) {
            existingCourse.setPrice(courseUpdateDTO.getPrice());
        }
        if (courseUpdateDTO.getIsPublished() != null) {
            existingCourse.setIsPublished(courseUpdateDTO.getIsPublished());
        }

        if (courseUpdateDTO.getDifficultyLevel() != null) {
            existingCourse.setDifficultyLevel(courseUpdateDTO.getDifficultyLevel());
        }
        if (courseUpdateDTO.getSkills() != null) {
            existingCourse.setSkills(courseUpdateDTO.getSkills());
        }
        if (courseUpdateDTO.getCourseRating() != null) {
            existingCourse.setCourseRating(courseUpdateDTO.getCourseRating());
        }

        return ResponseEntity.ok(new CourseDTO(courseService.updateCourse(existingCourse)));
    }

    @DeleteMapping("/records/{courseId}")
    public ResponseEntity<String> deleteCourse(@PathVariable String courseId) {
        Users user = AuthUtils.getAuthUser(SecurityContextHolder.getContext());
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        Course course = courseService.getCourse(courseId);

        if (!course.getOwner().equals(user)) {
            return ResponseEntity.badRequest().build();
        }

        try {
            courseService.deleteCourse(courseId);
            return ResponseEntity.ok("Chapter deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

  @GetMapping("/all")
   public ResponseEntity<List<CourseDTO>> getAllCourses() {
    // Fetch all courses using the courseService
    List<Course> courses = courseService.getAllCourses();
    
    // Convert the list of Course entities to a list of CourseDTOs
    List<CourseDTO> courseDTOs = new ArrayList<>();
    for (Course course : courses) {
        courseDTOs.add(new CourseDTO(course));
    }
    
    // Return the list of courses as the response
    return ResponseEntity.ok(courseDTOs);
}


    
}
