package com.example.firstTry.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "doctors")
@Data
@EqualsAndHashCode(callSuper = true)
public class Doctor extends User {

    private String licenseNumber;
    private String specialization;

    public Doctor() {
        this.setRole(Role.ROLE_DOCTOR);
        this.setEnabled(false); // Disabled until admin approval
    }

    @Override
    public Role getRole() {
        return Role.ROLE_DOCTOR;
    }
}
