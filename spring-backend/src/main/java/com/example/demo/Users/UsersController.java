package com.example.demo.Users;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Auth.JwtUtils;
import com.example.demo.Utilities.EmailService;
import com.example.demo.Utilities.EmailTemplates;
import com.example.demo.Utilities.PageableResponseBuilder;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/collections/users/")
public class UsersController {

    @SuppressWarnings("unused")
    private final String entity = "users";

    @Autowired
    private UsersService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private EmailService emailService;

    @GetMapping("/records")
    public ResponseEntity<Map<String, Object>> getUsers(
        @RequestParam(value = "page", required = false, defaultValue = "1") int page,
        @RequestParam(value = "perPage", required = false, defaultValue = "30") int perPage,
        @RequestParam(value = "sort", required = false) String sort,
        @RequestParam(value = "filter", required = false) String filter,
        @RequestParam(value = "skipTotal", required = false, defaultValue = "true") Boolean skipTotal
    ) {
        Page<Users> result = userService.getUsers(page, perPage, sort, filter);
        if(result == null) {
            return ResponseEntity.notFound().build();
        }
        PageableResponseBuilder<Users> builder = new PageableResponseBuilder<>();
        return ResponseEntity.ok(builder.buildResponseMap(result, skipTotal));
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<Users> getUser(
        @PathVariable String id
    ) {

        Users user = userService.getUser(id);
        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping(value = "/records", consumes = "multipart/form-data")
    @Operation
    public ResponseEntity<Users> createUser(
        @ModelAttribute UsersRegisterDto user
    ) throws IOException, Exception {
        Users newUser = userService.registerUser(user);

        if(newUser != null){
            emailService.sendEmail(
                newUser.getEmail(), 
                "Flash Account Verification", 
                EmailTemplates.getVerificationTemplate(
                    newUser.getName(),
                    "http://localhost:8080/api/collections/users/email-verification?token=%s".formatted(jwtUtils.generateJwtToken(newUser))
                )
            );
        }

        return ResponseEntity.ok(newUser);
    }

    @PatchMapping("/records/{id}")
    public ResponseEntity<Users> updateUser(
        @PathVariable String id,
        @ModelAttribute Users user,
        @RequestParam(value = "avatarFile", required = false) MultipartFile avatarFile
    ) throws IOException {
        Users existingUser = userService.getUser(id);
        user.setEmailVerified(existingUser.getEmailVerified());
        Users updatedUser = userService.updateUser(id, user, avatarFile);

        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/auth-with-password")
    public ResponseEntity<AuthTokenDto> authenticateUser(
        @ModelAttribute UsersLoginDto user
    ) {

        System.out.println("Authenticating user: " + user);
        AuthTokenDto authToken = new AuthTokenDto();
        Users authenticatedUser = userService.authenticate(user);
        if(authenticatedUser == null) {
            return ResponseEntity.badRequest().build();
        }
        String token = jwtUtils.generateJwtToken(authenticatedUser);
        authToken.setToken(token);
        return ResponseEntity.ok(authToken);
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<String> deleteUser(
        @PathVariable String id
    ) throws IOException {

        userService.deleteUser(id);
        
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/email-verification")
    public ResponseEntity<String> verifyEmail(
        @RequestParam String token
    ) {
        String username = jwtUtils.extractUsername(token);
        Users user = userService.getUserByUsername(username);
        if(jwtUtils.isTokenValid(token, user)){
            user.setEmailVerified(true);
            userService.updateUser(user.getId(), user, null);
            return ResponseEntity.ok("Email verified successfully");
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
