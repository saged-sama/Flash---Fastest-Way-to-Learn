package com.example.demo.Summarizer;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.springframework.stereotype.Service;

@Service
public class VideoSummarizer {

    public String summarize(String videoPath, String outputPath) {
        String pythonPath = "python";
        String scriptPath = "/Users/mahmudulhasanyeamim/Desktop/Flash---Fastest-Way-to-Learn/models/video_analyzer.py";

        try {
            ProcessBuilder processBuilder = new ProcessBuilder(
                    pythonPath,
                    scriptPath,
                    videoPath,
                    "--output",
                    outputPath);

            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();

            try (BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String errorLine;
                while ((errorLine = errorReader.readLine()) != null) {
                    System.err.println("Script Output: " + errorLine);
                }
            }

            int exitCode = process.waitFor();

            if (exitCode != 0) {
                throw new RuntimeException("Script failed with exit code: " + exitCode);
            }

            // Read the output file
            return new String(Files.readAllBytes(Paths.get(outputPath))).trim();
        } catch (Exception e) {
            throw new RuntimeException("Error executing Python script or reading output file", e);
        }
    }
}
