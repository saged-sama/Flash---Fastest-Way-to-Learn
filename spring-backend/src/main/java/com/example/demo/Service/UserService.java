package com.example.demo.Service;

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

    private final String tablename = "users";

    private final FileHandler fileHandler = new FileHandler();

    public List<Users> getUsers() {
        return userRepository.findAll();
    }

    public Users getUser(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public Users createUser(Users user, MultipartFile avatarFile) {
        // user.setPassword(securityConfig.passwordEncoder().encode(user.getPassword()));
        Users newUser = userRepository.save(user);

        String avatar = null;

        if (newUser != null && avatarFile != null) {
            avatar = fileHandler.saveFile(avatarFile, this.tablename, user.getId());
            user.setAvatar(avatar);
        }
        return newUser;
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
