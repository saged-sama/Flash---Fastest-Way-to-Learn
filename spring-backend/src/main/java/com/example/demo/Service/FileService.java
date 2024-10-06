package com.example.demo.Service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {

    private String uploadDir = "projectfiles/";

    public ResponseEntity<Resource> getFile(String tableName, String recordId, String fileName) throws MalformedURLException {
        String ContentType = null;
        Resource resource = null;
        try{
            Path filepath = Paths.get(uploadDir, tableName, recordId, fileName);

            if(!filepath.toFile().exists()) {
                return null;
            }

            resource = new UrlResource(filepath.toUri());
            ContentType = Files.probeContentType(filepath);
            
            if(ContentType == null) {
                ContentType = "application/octet-stream";
            }
        }
        catch(Exception e){
            return null;
        }

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(ContentType)).body(resource);
    }

    public void deleteFile(String tableName, String recordId, String fileName) {
        Path filepath = Paths.get(uploadDir, tableName, recordId, fileName);

        try{
            Files.deleteIfExists(filepath);
        }
        catch(Exception e){
            return;
        }
    }
}
