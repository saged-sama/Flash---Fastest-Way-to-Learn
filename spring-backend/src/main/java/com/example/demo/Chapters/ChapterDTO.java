package com.example.demo.Chapters;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ChapterDTO {
    private String id;
    private String title;

    private String description;
    @Schema(type = "string", format = "binary")
    private MultipartFile videoFile;
    private Integer position;

    private Boolean isPublished;
    private Boolean isFree;

    // public ChapterDTO(Chapter chapter) {
    //     this.id = chapter.getId();
    //     this.title = chapter.getTitle();
    //     this.description = chapter.getDescription();
    //     this.videoUrl = chapter.getVideoUrl();
    //     this.position = chapter.getPosition();
    //     this.isPublished = chapter.getIsPublished();
    //     this.isFree = chapter.getIsFree();
    // }

    public ChapterDTO(){}

    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
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
    
    public MultipartFile getVideoFile() {
        return videoFile;
    }
    
    public void setVideoUrl(MultipartFile videoFile) {
        this.videoFile = videoFile;
    }
    
    public Integer getPosition() {
        return position;
    }
    
    public void setPosition(Integer position) {
        this.position = position;
    }
    
    public Boolean getIsPublished() {
        return isPublished;
    }
    
    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
    }
    
    public Boolean getIsFree() {
        return isFree;
    }
    
    public void setIsFree(Boolean isFree) {
        this.isFree = isFree;
    }

    @Override
    public String toString() {
        return "CourseDTO{" +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", videoFile='" + videoFile + '\'' +
                ", isPublished=" + isPublished +
                '}';
    }
}
