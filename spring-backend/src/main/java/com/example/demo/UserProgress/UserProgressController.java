package com.example.demo.UserProgress;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Chapters.Chapter;
import com.example.demo.Chapters.ChapterService;
import com.example.demo.Users.Users;
import com.example.demo.Users.UsersService;

@Configuration
@RestController
@RequestMapping("/api/collections/user_progress")
public class UserProgressController {
    @Autowired
    private UserProgressService userProgressService;

    @Autowired
    private ChapterService chapterService;

    @Autowired
    private UsersService userService;

    @PatchMapping(value = "/records/{userId}", consumes = "multipart/form-data")
    public ResponseEntity<UserProgress> updaterUserProgress(@PathVariable String userId,
            @RequestParam String chapterId,
            @RequestParam Boolean isCompleted) throws IOException {
        Chapter chapter = chapterService.getChapter(chapterId);

        System.out.println("ChapterId: " + chapterId);
        System.out.println("UserId: " + userId);
        System.out.println("isCompleted: " + isCompleted);
        
        if (chapter == null) {
            throw new RuntimeException("Chapter not found");
        }

        Users user = userService.getUser(userId);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        

        // Check if the UserProgress record exists
        Optional<UserProgress> existingUserProgress = userProgressService.getUserProgress(userId, chapterId);

        if (!existingUserProgress.isEmpty()) {
            // Update the existing record
            UserProgress progress = existingUserProgress.get();
            progress.setIsCompleted(isCompleted);
            return ResponseEntity.ok(userProgressService.updateUserProgress(progress));
        } else {
            // Create a new record
            UserProgress userProgress = new UserProgress();
            userProgress.setUser(user);
            userProgress.setChapter(chapter);
            userProgress.setIsCompleted(isCompleted);
            return ResponseEntity.ok(userProgressService.createUserProgress(userProgress));
        }
    }

    @GetMapping("/records")
    public ResponseEntity<List<Chapter>> getCompletedChapters(@RequestParam String userId,
            @RequestParam(required = false) List<String> publishedChapterIds) {
        List<Chapter> chapters = new ArrayList<Chapter>();
        if (publishedChapterIds != null) {
            chapters = userProgressService.getCompletedChapters(userId, publishedChapterIds);
        }
        return ResponseEntity.ok(chapters);
    }

    @GetMapping("/records/{userId}")
    public ResponseEntity<UserProgressDTO> getUserProgress(@PathVariable String userId,
            @RequestParam String chapterId) {
        Optional<UserProgress> userProgress = userProgressService.getUserProgress(userId, chapterId);

        return userProgress.map(progress -> ResponseEntity.ok(new UserProgressDTO(progress)))
                .orElse(ResponseEntity.notFound().build());

    }

}
