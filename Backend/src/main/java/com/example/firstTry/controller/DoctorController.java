package com.example.firstTry.controller;

import com.example.firstTry.model.Doctor;
import com.example.firstTry.model.Patient;
import com.example.firstTry.repository.DoctorRepository;
import com.example.firstTry.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/doctor")
@RequiredArgsConstructor
@PreAuthorize("hasRole('DOCTOR')")
public class DoctorController {
    private final DoctorRepository doctorRepository;
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<Doctor> getDoctorProfile(Authentication authentication) {
        Doctor doctor = (Doctor) authentication.getPrincipal();
        return ResponseEntity.ok(doctor);
    }

    @PutMapping("/profile")
    public ResponseEntity<Doctor> updateProfile(@RequestBody Doctor updatedDoctor,
                                                Authentication authentication) {
        Doctor currentDoctor = (Doctor) authentication.getPrincipal();

        // Update allowed fields
        currentDoctor.setSpecialization(updatedDoctor.getSpecialization());
        currentDoctor.setLicenseNumber(updatedDoctor.getLicenseNumber());

        Doctor savedDoctor = doctorRepository.save(currentDoctor);
        return ResponseEntity.ok(savedDoctor);
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getMyPatients() {
        // Implement patient-Doctor relationship logic
        return ResponseEntity.ok(Collections.emptyList());
    }
}