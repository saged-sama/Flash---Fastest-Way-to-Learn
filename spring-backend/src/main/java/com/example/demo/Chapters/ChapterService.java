package com.example.demo.Chapters;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Courses.Course;
import com.example.demo.Files.FileHandler;
import com.example.demo.Utilities.EntityUpdate;

@Service
public class ChapterService {
    @Autowired
    private ChapterRepository chapterRepository;

    private final String tablename = "chapter";

    private final FileHandler fileHandler = new FileHandler();

    public Chapter createChapter(Chapter chapter) {
        return chapterRepository.save(chapter);
    }

    public Chapter getChapter(String chapterId) {
        return chapterRepository.findById(chapterId).orElse(null);
    }

    public List<Chapter> getChapters(Course course) {
        List<Chapter> chapters = chapterRepository.findByCourse(course);
        chapters.sort(Comparator.comparingInt(Chapter::getPosition));
        return chapters;
    }

    public Integer getHighestChapterPosition(Course course) {
        return chapterRepository.getHighestChapterPosition(course)
                .map(Chapter::getPosition)
                .orElse(null);
    }

    public Chapter updateChapter(String chapterId, ChapterDTO chapterDto) {
        Chapter existingChapter = chapterRepository.findById(chapterId).orElse(null);
        if (existingChapter == null) {
            return null;
        }

        if (chapterDto.getVideoFile() != null) {
            String video = fileHandler.saveFile(chapterDto.getVideoFile(), this.tablename, chapterId);
            existingChapter.setVideoUrl(video);
        }
        
        EntityUpdate.merge(existingChapter, chapterDto);
        
        return chapterRepository.save(existingChapter);
    }

    public void deleteChapter(String chapterId) {
        if (!chapterRepository.existsById(chapterId)) {
            throw new IllegalArgumentException("Chapter with ID " + chapterId + " does not exist");
        }
        chapterRepository.deleteById(chapterId);
    }

    public List<Chapter> getPublishedChapters(Course course) {
        List<Chapter> chapters = chapterRepository.getPublishedChapters(course);
        chapters.sort(Comparator.comparingInt(Chapter::getPosition));
        return chapters;
    }

    public List<Chapter> getNextChapter(String currentChapterId) {
        return chapterRepository.findNextChapterByCurrentChapterId(currentChapterId);
    }
}   
