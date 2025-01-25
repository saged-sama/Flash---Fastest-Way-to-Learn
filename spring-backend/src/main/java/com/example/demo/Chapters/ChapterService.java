package com.example.demo.Chapters;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Courses.Course;
import com.example.demo.Files.FileHandler;
import com.example.demo.Summarizer.VideoSummarizerService;
import com.example.demo.Utilities.EntityUpdate;

@Service
public class ChapterService {
    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private VideoSummarizerService videoSummarizerService;

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
            
            // Uncomment it to run the video summarizer model in a new thread
            // Caution: Don't run it on the GPU

            // Construct video and output paths
            // String videoFullPath = "/Users/mahmudulhasanyeamim/Desktop/Flash---Fastest-Way-to-Learn/spring-backend/projectfiles/chapter/" + chapterId + "/" + video;
            // String outputFullPath = "/Users/mahmudulhasanyeamim/Desktop/Flash---Fastest-Way-to-Learn/spring-backend/projectfiles/chapter/" + chapterId + "/output.txt";
            
            // String videoFullPath = "mkbhd.mov";
            // String outputFullPath = "/Users/mahmudulhasanyeamim/Projects/Flash---Fastest-Way-to-Learn/models/output.txt";

            // // Run the Python script in a new thread
            // String summary = videoSummarizerService.processVideoAsync(videoFullPath, outputFullPath);

            // String summary = "The ROG Phone 9.0 is a gaming phone. It was released late in the calendar year. But because it's aGaming phone, it's one of the biggest phones on the market.";
            String summary = "The ROG Phone 9.0 is a gaming phone designed for performance enthusiasts. Released later in the calendar year, it stands out not only for its gaming-focused capabilities but also for being one of the largest phones on the market. Its size and features make it a significant presence in the world of gaming devices";
            existingChapter.setSummary(summary);
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
