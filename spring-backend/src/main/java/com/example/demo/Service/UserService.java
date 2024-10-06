package com.example.demo.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

// import com.example.demo.Configuration.SecurityConfig;
import com.example.demo.Entity.Users;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Utilities.EntityUpdate;
import com.example.demo.Utilities.FileHandler;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // @Autowired
    // private SecurityConfig securityConfig;

    private final FileHandler fileHandler = new FileHandler("avatars");

    public List<Users> getUsers() {
        return userRepository.findAll();
    }

    public Users getUser(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public Users createUser(Users user, MultipartFile avatarFile) {
        String avatar = null;
        if (avatarFile != null) {
            try {
                avatar = fileHandler.saveFile(avatarFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
            user.setAvatar(avatar);
        }
        // user.setPassword(securityConfig.passwordEncoder().encode(user.getPassword()));
        user.setAvatar(avatar);
        return userRepository.save(user);
    }

    public Users updateUser(String id, Users user, MultipartFile avatarFile) {
        String avatar = null;
        if (avatarFile != null) {
            try {
                avatar = fileHandler.saveFile(avatarFile
                );
            } catch (IOException e) {
                e.printStackTrace();
            }
            user.setAvatar(avatar);
        }
        Users existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null) {
            return null;
        }
        
        EntityUpdate.merge(existingUser, user);
        
        return userRepository.save(existingUser);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
