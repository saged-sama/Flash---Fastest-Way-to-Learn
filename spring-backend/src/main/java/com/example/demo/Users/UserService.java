package com.example.demo.Users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Files.FileHandler;
import com.example.demo.Utilities.EntityUpdate;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final String tablename = "users";

    private final FileHandler fileHandler = new FileHandler();

    public List<Users> getUsers() {
        return userRepository.findAll();
    }

    public Users getUser(String id) {
        return userRepository.findById(id).orElse(null);
    }

    @SuppressWarnings("null")
    public Users createUser(Users user, MultipartFile avatarFile) {
        // user.setPassword(securityConfig.passwordEncoder().encode(user.getPassword()));

        String avatar = null;
        // System.out.println(user);
        user = userRepository.save(user);

        if (user != null && avatarFile != null) {
            avatar = fileHandler.saveFile(avatarFile, this.tablename, user.getId());
            user.setAvatar(avatar);
        }
        user = userRepository.save(user);
        return user;
    }

    public Users updateUser(String id, Users user, MultipartFile avatarFile) {
        String avatar = null;
        if (avatarFile != null) {
            avatar = fileHandler.saveFile(avatarFile, this.tablename, user.getId());
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
