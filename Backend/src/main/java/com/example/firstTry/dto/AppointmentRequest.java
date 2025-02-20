package com.example.firstTry.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;


import java.time.LocalDateTime;

public record AppointmentRequest(
        @NotNull
        @Future(message = "Consultation date must be in the future")
        LocalDateTime consultationDateTime,

        @NotNull @Positive
        Long doctorId,

        @Size(max = 500)
        String reason
) {}
