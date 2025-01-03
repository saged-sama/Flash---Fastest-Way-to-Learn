package com.example.demo.Files;
import com.example.demo.Utilities.UtilitiesInterface.FileHandlerInterface;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileHandler implements FileHandlerInterface {
    private String uploadDir = "projectfiles/";

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

    @Override
    public String saveFile(MultipartFile file, String tableName, String recordId){
        String filename = generateTimestampedFileName(file.getOriginalFilename());
        Path filepath = Paths.get(uploadDir, tableName, recordId, filename);

        try{
            Files.createDirectories(filepath.getParent());

            Files.write(filepath, file.getBytes());
        }
        catch(IOException e){
            return null;
        }

        return filename;
    }

    @Override
    public List<String> saveFiles(MultipartFile[] files, String tableName, String recordId) {
        List<String> fileNames = new ArrayList<String>();

        for(MultipartFile file : files) {
            fileNames.add(saveFile(file, tableName, recordId));
        }

        return fileNames;
    }

    @Override
    public void deleteFile(String filename, String tableName, String recordId) {
        Path filepath = Paths.get(uploadDir, filename);
        try{
            Files.deleteIfExists(filepath);
        }
        catch(IOException e){
            e.printStackTrace();
        }
    }
}
