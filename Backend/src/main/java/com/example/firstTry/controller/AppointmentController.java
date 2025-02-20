package com.example.firstTry.controller;

import com.example.firstTry.dto.AppointmentRequest;
import com.example.firstTry.dto.AppointmentResponse;
import com.example.firstTry.model.*;
import com.example.firstTry.services.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<AppointmentResponse> createAppointment(
            @RequestBody @Valid AppointmentRequest request,
            @AuthenticationPrincipal User user) {

        Appointment created = appointmentService.createAppointment(request, user);
        return ResponseEntity
                .created(URI.create("/api/appointments/" + created.getId()))
                .body(mapToResponse(created));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<AppointmentResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam Appointment.AppointmentStatus status,
            @AuthenticationPrincipal User user) {

        Appointment updated = appointmentService.updateStatus(id, status, user);
        return ResponseEntity.ok(mapToResponse(updated));
    }

    @GetMapping("/patient")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<AppointmentResponse>> getPatientAppointments(
            @AuthenticationPrincipal Patient patient) {

        List<Appointment> appointments = appointmentService.getPatientAppointments(patient.getId());
        return ResponseEntity.ok(mapToResponseList(appointments));
    }

    // Manual mapping methods
    private AppointmentResponse mapToResponse(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getId(),
                appointment.getConsultationDateTime(),
                appointment.getStatus().name(),
                appointment.getDoctor().getFullname(),
                appointment.getDoctor().getSpecialization(),
                appointment.getPatient().getFullname(),
                appointment.getReason(),
                appointment.getCreatedAt()
        );
    }

    private List<AppointmentResponse> mapToResponseList(List<Appointment> appointments) {
        return appointments.stream()
                .map(this::mapToResponse)
                .toList();
    }
}