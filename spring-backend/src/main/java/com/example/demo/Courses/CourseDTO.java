package com.example.demo.Courses;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor 
@NoArgsConstructor
public class CourseDTO {
    private String id;
    private String ownerId;
    private String title;
    private String description;
    private String imageUrl;
    private Float price;
    private Boolean isPublished;
    private String categoryId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Custom Constructor
    public CourseDTO(Course course) {
        this.id = course.getId();
        this.ownerId = course.getOwner() != null ? course.getOwner().getId() : null;
        this.title = course.getTitle();
        this.description = course.getDescription();
        this.imageUrl = course.getImageUrl();
        this.price = course.getPrice();
        this.isPublished = course.getIsPublished();
        this.categoryId = course.getCategory() != null ? course.getCategory().getId() : null;
        this.createdAt = course.getCreatedAt() != null ? course.getCreatedAt() : null;
        this.updatedAt = course.getUpdatedAt() != null ? course.getUpdatedAt() : null;
    }

    
}
