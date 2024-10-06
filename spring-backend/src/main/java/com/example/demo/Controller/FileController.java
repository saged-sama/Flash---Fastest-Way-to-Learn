package com.example.demo.Controller;

import java.net.MalformedURLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.FileService;

@RestController
@RequestMapping("/api/files")
public class FileController {
    @Autowired
    private FileService fileService;
    
    @GetMapping("/{tableName}/{recordId}/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable String tableName, @PathVariable String recordId, @PathVariable String fileName) throws MalformedURLException {
        return fileService.getFile(tableName, recordId, fileName);
    }

    @DeleteMapping("/{tableName}/{recordId}/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String tableName, @PathVariable String recordId, @PathVariable String fileName) {
        fileService.deleteFile(tableName, recordId, fileName);
        return ResponseEntity.ok("Deleted");
    }
}
