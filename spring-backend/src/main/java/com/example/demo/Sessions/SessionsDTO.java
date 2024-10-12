package com.example.demo.Sessions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor 
@NoArgsConstructor
public class SessionsDTO {
    private String id;
    private String ownerId;
    private String title;
    private String description;
    private String createdAt;
    private String updatedAt;
}
