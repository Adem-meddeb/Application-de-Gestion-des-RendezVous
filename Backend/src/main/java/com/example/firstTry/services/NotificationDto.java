package com.example.firstTry.services;

import com.example.firstTry.model.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {

    private Long id;
    private String message;
    private NotificationType type;
    private boolean isRead;
    private LocalDateTime timestamp;



}
