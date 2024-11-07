package com.example.demo.Users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Files.FileHandler;
import com.example.demo.Utilities.EntityUpdate;

@Service
public class UsersService{
    @Autowired
    private UsersRepository usersRepository;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    private final String tablename = "users";

    private final FileHandler fileHandler = new FileHandler();

    public UsersService(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<Users> getUsers() {
        return usersRepository.findAll();
    }

    public Users getUser(String id) {
        return usersRepository.findById(id).orElse(null);
    }

    public Users updateUser(String id, Users user, MultipartFile avatarFile) {
        String avatar = null;
        if (avatarFile != null) {
            avatar = fileHandler.saveFile(avatarFile, this.tablename, user.getId());
            user.setAvatar(avatar);
        }
        Users existingUser = usersRepository.findById(id).orElse(null);
        if (existingUser == null) {
            return null;
        }
        
        EntityUpdate.merge(existingUser, user);
        
        return usersRepository.save(existingUser);
    }

    public Users registerUser(UsersRegisterDto user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Users incomingNewUser = new Users();
        EntityUpdate.merge(incomingNewUser, user);
        Users newuser = usersRepository.save(incomingNewUser);
        
        if (newuser != null) {
            newuser.setRole(UsersRoles.ROLE_USER);
            String avatar = fileHandler.saveFile(user.getAvatarFile(), this.tablename, newuser.getId());
            newuser.setAvatar(avatar);
        }
        return usersRepository.save(newuser);
    }

    public Users authenticate(UsersLoginDto userLoginInfo){
        String password = userLoginInfo.getPassword();
        String username = userLoginInfo.getUsername();

        if(username == null){
            Users user = usersRepository.findByEmail(userLoginInfo.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
            username = user.getUsername();
        }
        
        UsernamePasswordAuthenticationToken authReq = new UsernamePasswordAuthenticationToken(password, username);

        this.authenticationManager.authenticate(authReq);

        return usersRepository.findByUsername(username).get(); 
    }

    public void deleteUser(String id) {
        usersRepository.deleteById(id);
    }
}
