package com.example.demo.Utilities;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.web.multipart.MultipartFile;

public class FileHandler {
    private String uploadDir = "files/";

    public FileHandler(String uploadDir) {
        this.uploadDir = this.uploadDir + uploadDir;

    }

    private String generateTimestampedFileName(String originalFileName) {
        long timestamp = System.currentTimeMillis();

        String extension = "";
        int dotIndex = originalFileName.lastIndexOf(".");
        if (dotIndex > 0) {
            extension = originalFileName.substring(dotIndex);
            originalFileName = originalFileName.substring(0, dotIndex);
        }

        return timestamp + "_" + originalFileName + extension;
    }

    public String saveFile(MultipartFile file) throws IOException{
        String filename = generateTimestampedFileName(file.getOriginalFilename());
        Path filepath = Paths.get(uploadDir, filename);

        Files.createDirectories(filepath.getParent());

        Files.write(filepath, file.getBytes());

        return filename;
    }

    public List<String> saveFiles(MultipartFile[] files) throws IOException {
        List<String> fileNames = new ArrayList<String>();

        for(MultipartFile file : files) {
            fileNames.add(saveFile(file));
        }

        return fileNames;
    }

    public void deleteFile(String filename) throws IOException {
        Path filepath = Paths.get(uploadDir, filename);

        Files.deleteIfExists(filepath);
    }
}
