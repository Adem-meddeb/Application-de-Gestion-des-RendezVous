package com.example.firstTry.repository;

import com.example.firstTry.model.Appointment;
import com.example.firstTry.model.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
//    List<Appointment> findByPatientId(Long patientId);
//    List<Appointment> findByDoctorId(Long doctorId);
//    List<Appointment> findByStatus(AppointmentStatus status);
    boolean existsByDoctorIdAndConsultationDateTime(Long doctorId, LocalDateTime dateTime);

    @Query("SELECT a FROM Appointment a WHERE " + "a.doctor.id = :doctorId AND " +
            "a.consultationDateTime BETWEEN :start AND :end")
    List<Appointment> findDoctorSchedule(
            @Param("doctorId") Long doctorId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    List<Appointment> findByPatientId(Long patientId);
}
