package com.example.firstTry.dto;

import com.example.firstTry.model.Role;
import com.example.firstTry.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String fullname;
    private String email;
    private Role role;  // Changed from Set<Role>
    private String token;

    public UserResponse(User user, String token) {
        this.id = user.getId();
        this.fullname = user.getFullname();
        this.email = user.getEmail();
        this.role = user.getRole();  // Changed from getRoles()
        this.token = token;
    }

}