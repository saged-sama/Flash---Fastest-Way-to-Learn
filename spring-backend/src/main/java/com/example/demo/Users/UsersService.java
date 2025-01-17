package com.example.demo.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Files.FileHandler;
import com.example.demo.Utilities.EntityUpdate;
import com.example.demo.Utilities.QueryFilters;

@Service
public class UsersService{
    @Autowired
    private UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    private final String tablename = "users";

    private final FileHandler fileHandler = new FileHandler();

    public UsersService(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Page<Users> getUsers(int page, int perPage, String sort, String filter) {
        Pageable pageable = PageRequest.of(page - 1, perPage, QueryFilters.parseSort(sort));
        QueryFilters<Users> queryFilters = new QueryFilters<>();
        Specification<Users> spec = queryFilters.buildSpecification(filter);
        Page<Users> users = usersRepository.findAll(spec, pageable);
        return users;
    }

    public Users getUser(String id) {
        return usersRepository.findById(id).orElse(null);
    }

    public Users getUserByUsername(String username) {
        return usersRepository.findByUsername(username).orElse(null);
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
            MultipartFile avatarFile = user.getAvatarFile();
            if(avatarFile != null){
                String avatar = fileHandler.saveFile(user.getAvatarFile(), this.tablename, newuser.getId());
                newuser.setAvatar(avatar);
            }
        }
        return usersRepository.save(newuser);
    }

    public Users authenticate(UsersLoginDto userLoginInfo){
        String password = userLoginInfo.getPassword();
        String username = userLoginInfo.getUsername();
        String email = userLoginInfo.getEmail();

        Users user = null;

        if(username != null){
            user = usersRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        } else if(email != null){
            user = usersRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        } else {
            throw new UsernameNotFoundException("No username or email provided");
        }

        String encodedPassword = user.getPassword();
        boolean authenticated = passwordEncoder.matches(password, encodedPassword);

        if(authenticated){
            return user;
        }
        else{
            return null;
        }
    }

    public void deleteUser(String id) {
        usersRepository.deleteById(id);
    }
}
