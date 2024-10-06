package com.example.demo.Utilities.UtilitiesInterface;

import org.springframework.web.multipart.MultipartFile;

import io.jsonwebtoken.io.IOException;
import java.util.List;


public interface FileHandlerInterface {
    public String saveFile(MultipartFile file, String tableName, String recordId);
    public List<String> saveFiles(MultipartFile[] files, String tableName, String recordId) throws IOException;
    public void deleteFile(String fileName, String tableName, String recordId) throws IOException;
}
