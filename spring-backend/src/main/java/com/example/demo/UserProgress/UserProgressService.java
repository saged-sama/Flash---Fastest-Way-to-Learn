package com.example.demo.UserProgress;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Chapters.Chapter;

@Service
public class UserProgressService {
    @Autowired
    UserProgressRepository userProgressRepository;

    public List<Chapter> getCompletedChapters(String userId, List<String> publishedChapterIds) {
        return userProgressRepository.findDistinctByUserIdAndChapterIdInAndIsCompletedTrue(userId, publishedChapterIds);
    }

    public Optional<UserProgress> getUserProgress(String userId, String chapterId) {
        return userProgressRepository.findByUserIdAndChapterId(userId, chapterId);
    }

    public UserProgress createUserProgress(UserProgress userProgress) {
        return userProgressRepository.save(userProgress);
    }

    public UserProgress updateUserProgress(UserProgress userProgress) {
        return userProgressRepository.save(userProgress);
    }
}
