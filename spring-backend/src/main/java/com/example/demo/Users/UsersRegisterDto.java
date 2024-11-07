package com.example.demo.Users;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class UsersRegisterDto {
    private String email;
    private String username;
    private String password;
    private String name;

    @Schema(type = "string", format = "binary")
    private MultipartFile avatarFile;

    public UsersRegisterDto() {
    }

    public UsersRegisterDto(String email, String username, String password, String name, MultipartFile avatarFile) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = name;
        this.avatarFile = avatarFile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MultipartFile getAvatarFile() {
        return avatarFile;
    }

    public void setAvatarFile(MultipartFile avatar) {
        this.avatarFile = avatar;
    }
}
