package com.example.demo.CourseInteractions;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.Courses.Course;
import com.example.demo.Courses.CourseService;
import com.example.demo.Users.Users;
import com.example.demo.Users.UsersService;

import java.util.Optional;

@Service
public class CourseInteractionsService {
    //@Autowired
  //  private CourseInteractionsRepository courseInteractionsRepo;
    // @Autowired
    // private CourseService courseService;
    // @Autowired
    // private UsersService usersService;

    @Autowired
    private CourseInteractionsRepository repository;

    @Autowired
    private CourseService courseService;

    @Autowired
    private UsersService usersService;

    public CourseInteractions createOrUpdateInteraction(CourseInteractionsDto dto) {
        // Get Course and User objects
        Course course = courseService.getCourse(dto.getCourseId());
        Users user = usersService.getUser(dto.getUserId());

        // Find if interaction already exists
        Optional<CourseInteractions> existingInteraction = repository.findByCourseIdAndUserId(course.getId(), user.getId());

        if (existingInteraction.isPresent()) {
            CourseInteractions interaction = existingInteraction.get();
            interaction.setCount(interaction.getCount() + 1); // Increment the count
            interaction.setUpdatedAt(LocalDateTime.now());   // Update the timestamp
            return repository.save(interaction);
        } else {
            // Create a new interaction
            CourseInteractions newInteraction = new CourseInteractions();
            newInteraction.setCourse(course);
            newInteraction.setUser(user);
            newInteraction.setCount(1L); // Initialize count as 1
            return repository.save(newInteraction);
        }
    }

    public Optional<Object[]> getMostInteractedCourse() {
        return repository.findMostInteractedCourse();
    }



   // public CourseInteractions createCourseInteraction(CourseInteractionsDto courseInteraction){
    //     CourseInteractions newCourseInteraction = new CourseInteractions();
    //     Course course = courseService.getCourse(courseInteraction.getCourseId());
    //     Users user = usersService.getUser(courseInteraction.getUserId());
    //     newCourseInteraction = CourseInteractionsRepository.findByCourseIdAndUserId(course.getId(), user.getId());

    //     System.out.println("Existing: " + newCourseInteraction);
    //     if(newCourseInteraction != null){
    //         // synchronized(CourseInteractionsService.class){
    //             LocalDateTime currentTime = LocalDateTime.now();
    //             if(Duration.between(newCourseInteraction.getUpdatedAt(), currentTime).toMinutes() < 10){
    //                 return newCourseInteraction;
    //             }
    //             newCourseInteraction.setCount(newCourseInteraction.getCount() + 1);
    //         // }
    //     }
    //     else{
    //         newCourseInteraction = new CourseInteractions();
    //         newCourseInteraction.setCourse(course);
    //         newCourseInteraction.setUser(user);
    //         newCourseInteraction.setCount(1l);
    //     }
    //     return courseInteractionsRepo.save(newCourseInteraction);
    // }
 
    // public List<CourseInteractions> get
    // public Page<CourseInteractions> getCourseInteractions(int page, int perPage, String sort, String filter){
    //     Pageable pageable = PageRequest.of(page, perPage, QueryFilters.parseSort(sort));

    // }

   

    // public List<CourseInteractions> getAllCourseInteractions(){
    //     return CourseInteractionsRepository.findAll();
    // }

    // public CourseInteractions getCourseInteraction(String id){
    //     return CourseInteractionsRepository.findById(id).orElse(null);
    // }
}
