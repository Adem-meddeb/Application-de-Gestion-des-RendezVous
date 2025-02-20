package com.example.firstTry.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Entity
@Table(name = "patients")
@Data
@EqualsAndHashCode(callSuper = true)
public class Patient extends User {
    private String insuranceId;
    private LocalDate dateOfBirth;

    public Patient() {
        this.setRole(Role.ROLE_PATIENT);
    }

    @Override
    public Role getRole() {
        return Role.ROLE_PATIENT;
    }
}
