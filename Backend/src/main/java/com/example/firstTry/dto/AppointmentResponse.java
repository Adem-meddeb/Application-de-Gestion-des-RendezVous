package com.example.firstTry.dto;

import java.time.LocalDateTime;

public record AppointmentResponse(
        Long id,
        LocalDateTime consultationDateTime,
        String status,
        String doctorName,
        String doctorSpecialization,
        String patientName,
        String reason,
        LocalDateTime createdAt
) {}