package com.example.firstTry.dto;

import com.example.firstTry.model.NotificationType;

import java.time.LocalDateTime;

public record NotificationDto(
	    Long id,
	    String message,
	    NotificationType type,
	    boolean isRead, // boolean au lieu de Boolean
	    LocalDateTime timestamp
	) {}
