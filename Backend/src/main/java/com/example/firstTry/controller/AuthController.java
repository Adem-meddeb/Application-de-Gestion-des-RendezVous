package com.example.firstTry.controller;

import com.example.firstTry.dto.AuthRequest;
import com.example.firstTry.dto.UserResponse;
import com.example.firstTry.model.Admin;
import com.example.firstTry.model.Doctor;
import com.example.firstTry.model.Patient;
import com.example.firstTry.model.User;
import com.example.firstTry.security.jwt.JwtService;
import com.example.firstTry.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        Admin savedAdmin = userService.createAdmin(admin);
        String token = jwtService.generateToken(savedAdmin);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/register/doctor")
    public ResponseEntity<?> registerDoctor(@RequestBody Doctor doctor) {
        Doctor savedDoctor = userService.registerDoctor(doctor);
        return ResponseEntity.ok().body(
                Map.of("message", "Doctor registration pending approval")
        );
    }

    @PostMapping("/register/patient")
    public ResponseEntity<?> registerPatient(@RequestBody Patient patient) {
        Patient savedPatient = userService.registerPatient(patient);
        String token = jwtService.generateToken(savedPatient);
        // Changed 'user' to 'savedPatient'
        return ResponseEntity.ok(new UserResponse(savedPatient, token));
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
//        UserDetails userDetails = userService.loadUserByUsername(request.getEmail());
//
//        if (!userDetails.isEnabled()) {
//            throw new DisabledException("Account not approved");
//        }
//        if (!passwordEncoder.matches(request.getPassword(), userDetails.getPassword())) {
//            throw new BadCredentialsException("Invalid credentials");
//        }
//
//        // Cast UserDetails to User
//        User user = (User) userDetails;
//        String token = jwtService.generateToken(user);
//        return ResponseEntity.ok(new UserResponse(user, token));
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        UserDetails userDetails = userService.loadUserByUsername(request.getEmail());

        if (!(userDetails instanceof User)) {
            throw new AuthenticationServiceException("Unexpected user type");
        }

        User user = (User) userDetails;

        if (!user.isEnabled()) {
            throw new DisabledException("Account not approved");
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(new UserResponse(user, token));
    }
}