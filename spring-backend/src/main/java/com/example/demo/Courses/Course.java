package com.example.demo.Courses;

import java.time.LocalDateTime;
import java.util.stream.Gatherer.Integrator;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.example.demo.Categories.Category;
import com.example.demo.Users.Users;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@Entity
public class Course {
    @Id
    @GeneratedValue(
        strategy = GenerationType.UUID
    )
    private String id;

    @ManyToOne
    @JoinColumn(
        name = "owner",
        nullable = false
    )
    private Users owner;
    private String title;
    private String description;
    private String imageUrl;
    private Float price;
    private Boolean isPublished;

   

    private String difficultyLevel;
    private String skills; 

    private Integer courseRating;

    @ManyToOne
    @JoinColumn(
        name = "category_id",
        nullable = true
    )

   @JsonBackReference
    private Category category;

    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Course() {
    }

    public Course(String title) {
        this.title = title;
        this.isPublished = false;
        this.price = 0.0f;
    }

    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public Users getOwner() {
        return owner;
    }
    
    public void setOwner(Users owner) {
        this.owner = owner;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public Float getPrice() {
        return price;
    }
    
    public void setPrice(Float price) {
        this.price = price;
    }
    
    public Boolean getIsPublished() {
        return isPublished;
    }
    
    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
    }
    
    public Category getCategory() {
        return category;
    }
    
    public void setCategory(Category category) {
        this.category = category;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }  


    

    
     public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

   
    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    
    public Integer getCourseRating() {
        return courseRating;
    }

    public void setCourseRating(Integer courseRating) {
        this.courseRating = courseRating;
    }



}
