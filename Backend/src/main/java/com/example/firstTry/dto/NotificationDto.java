package com.example.firstTry.dto;

import com.example.firstTry.model.NotificationType;

import java.time.LocalDateTime;

public record NotificationDto(
	    Long id,
	    String message,
	    NotificationType type,
	    boolean isRead, // Nom correct du champ
	    LocalDateTime timestamp
	) {}