package com.example.backend1.controller;

import com.example.backend1.entity.User;
import com.example.backend1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Frontend connectivity kaaga
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // 1. DATA STORE PANNA (Signup)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }
        userRepository.save(user); // Ithu thaan XAMPP-la data store pannum
        return ResponseEntity.ok("User registered successfully!");
    }

    // 2. LOGIN CHECK PANNA
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginReq) {
        Optional<User> user = userRepository.findByUsername(loginReq.getUsername());

        if (user.isPresent() && user.get().getPassword().equals(loginReq.getPassword())) {
            // Success aana username-ah response-ah anupum
            return ResponseEntity.ok(user.get().getUsername());
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}