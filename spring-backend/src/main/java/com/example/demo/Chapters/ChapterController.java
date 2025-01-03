package com.example.demo.Chapters;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Courses.Course;
import com.example.demo.Courses.CourseService;

@Configuration
@RestController
@RequestMapping("/api/collections/chapter")
public class ChapterController {
    @Autowired
    private ChapterService chapterService;

    @Autowired
    private CourseService courseService;

    @PostMapping("/records")
    public ResponseEntity<Chapter> createCourse(@RequestParam String title, @RequestParam String courseId)
            throws IOException {
        Chapter chapter = new Chapter();
        chapter.setTitle(title);

        Course course = courseService.getCourse(courseId);
        chapter.setCourse(course);

        Integer position = chapterService.getHighestChapterPosition(course);
        if (position != null) {
            chapter.setPosition(position + 1);
        } else {
            chapter.setPosition(1);
        }

        Chapter createdChapter = chapterService.createChapter(chapter);
        return ResponseEntity.ok(createdChapter);
    }

    @GetMapping("/records/{chapterId}")
    public ResponseEntity<Chapter> getChapter(@PathVariable String chapterId,
            @RequestParam(required = false) Boolean nextChapter) {
        if (nextChapter == null) {
            return ResponseEntity.ok(chapterService.getChapter(chapterId));
        } else {
            List<Chapter> chapters = chapterService.getNextChapter(chapterId);
            if (chapters != null && !chapters.isEmpty()) {
                return ResponseEntity.ok(chapters.get(0));
            }
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<Chapter>> getChapters(@RequestParam String courseId, @RequestParam Boolean published) {
        List<Chapter> chapters = new ArrayList<Chapter>();
        if (published) {
            Course course = courseService.getCourse(courseId);
            chapters = chapterService.getPublishedChapters(course);
        } else {
            chapters = chapterService.getChapters(courseService.getCourse(courseId));
        }
        return ResponseEntity.ok(chapters);
    }

    @PatchMapping(value = "/records/{chapterId}", consumes = "multipart/form-data")
    public ResponseEntity<Chapter> updateChapter(@ModelAttribute ChapterDTO chapterDto,
            @PathVariable String chapterId) {
        System.out.println("Chapter DTO: " + chapterDto.toString());
        return ResponseEntity.ok(chapterService.updateChapter(chapterId, chapterDto));
    }

    @DeleteMapping("/records/{chapterId}")
    public ResponseEntity<String> deleteChapter(@PathVariable String chapterId) {
        try {
            chapterService.deleteChapter(chapterId);
            return ResponseEntity.ok("Chapter deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
