package com.example.firstTry.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
//
//public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
////    List<Appointment> findByPatientId(Long patientId);
////    List<Appointment> findByDoctorId(Long doctorId);
////    List<Appointment> findByStatus(AppointmentStatus status);
//    boolean existsByDoctorIdAndConsultationDateTime(Long doctorId, LocalDateTime dateTime);
//
//    @Query("SELECT a FROM Appointment a WHERE " + "a.doctor.id = :doctorId AND " +
//            "a.consultationDateTime BETWEEN :start AND :end")
//    List<Appointment> findDoctorSchedule(
//            @Param("doctorId") Long doctorId,
//            @Param("start") LocalDateTime start,
//            @Param("end") LocalDateTime end
//    );
//
//    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
//            "FROM Appointment a " +
//            "WHERE a.doctor.id = :doctorId " +
//            "AND (a.consultationDateTime < :newEnd AND a.endDateTime > :newStart)")
//    boolean existsOverlappingAppointments(
//            @Param("doctorId") Long doctorId,
//            @Param("newStart") LocalDateTime newStart,
//            @Param("newEnd") LocalDateTime newEnd);
//
//        @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
//                "FROM Appointment a " +
//                "WHERE a.doctor.id = :doctorId " +
//                "AND (a.consultationDateTime < :newEnd AND a.endDateTime > :newStart)")
//        boolean hasOverlappingAppointments(
//                @Param("doctorId") Long doctorId,
//                @Param("newStart") LocalDateTime newStart,
//                @Param("newEnd") LocalDateTime newEnd
//        );
//
//
//
//    List<Appointment> findByPatientId(Long patientId);
//}
