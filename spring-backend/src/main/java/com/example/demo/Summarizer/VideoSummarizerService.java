package com.example.demo.Summarizer;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class VideoSummarizerService {

    private final VideoSummarizer videoSummarizer;

    public VideoSummarizerService(VideoSummarizer videoSummarizer) {
        this.videoSummarizer = videoSummarizer;
    }

    @Async
    public String processVideoAsync(String videoPath, String outputPath) {
        return videoSummarizer.summarize(videoPath, outputPath);
    }
}
