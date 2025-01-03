package com.example.demo.Courses;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor 
public class CourseUpdateDTO {
    private String title;
    private String description;
    
    @Schema(type = "string", format = "binary")
    private MultipartFile imageFile;

    private Float price;
    private Boolean isPublished;
    private String categoryId;

    public CourseUpdateDTO(){}

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

    public MultipartFile getImageFile() {
        return imageFile;
    }
    
    public void setImageUrl(MultipartFile imageFile) {
        this.imageFile = imageFile;
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

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public String toString() {
        return "CourseDTO{" +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", imageFile='" + imageFile + '\'' +
                ", price=" + price +
                ", isPublished=" + isPublished +
                ", categoryId='" + categoryId + '\'' +
                '}';
    }
}
