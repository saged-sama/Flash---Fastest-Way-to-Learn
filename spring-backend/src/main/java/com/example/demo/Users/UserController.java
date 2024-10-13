package com.example.demo.Users;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
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
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.example.demo.Websocket.GenericWebSocketHandler;

@Configuration
@EnableWebSocket
@RestController
@RequestMapping("/api/collections/users/")
public class UserController implements WebSocketConfigurer {

    private final String entity = "users";

    @Autowired
    private UserService userService;

    @Autowired
    private GenericWebSocketHandler webSocketHandler;

    @GetMapping("/records")
    public ResponseEntity<List<Users>> getUsers() {

        List<Users> users = userService.getUsers();

        return ResponseEntity.ok(users);
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

    @PostMapping("/records")
    public ResponseEntity<Users> createUser(
        @ModelAttribute Users user, 
        @RequestParam("avatarFile") MultipartFile avatarFile
    ) throws IOException {
        Users newUser = userService.createUser(user, avatarFile);
        webSocketHandler.notifyEntityUpdate(entity, "create");
        return ResponseEntity.ok(newUser);
    }

    @PatchMapping("/records/{id}")
    public ResponseEntity<Users> updateUser(
        @PathVariable String id,
        @ModelAttribute Users user,
        @RequestParam(value = "avatarFile", required = false) MultipartFile avatarFile
    ) throws IOException {

        Users updatedUser = userService.updateUser(id, user, avatarFile);

        webSocketHandler.notifyEntityUpdate(entity, "update");
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<String> deleteUser(
        @PathVariable String id
    ) throws IOException {

        userService.deleteUser(id);
        
        webSocketHandler.notifyEntityUpdate(entity, "delete");
        return ResponseEntity.ok("User deleted successfully");
    }

    @SuppressWarnings("null")
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/ws/" + entity)
                .setAllowedOrigins("*");
    }
}
