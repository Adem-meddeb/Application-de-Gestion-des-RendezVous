package com.example.firstTry.services;

import com.example.firstTry.dto.AppointmentRequest;
import com.example.firstTry.model.*;
import com.example.firstTry.repository.AppointmentRepository;
import com.example.firstTry.repository.DoctorRepository;
import com.example.firstTry.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.example.firstTry.model.Appointment.AppointmentStatus.COMPLETED;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final NotificationService notificationService;


    @Transactional
    public Appointment createAppointment(AppointmentRequest request, User requester) {
        Patient patient = validatePatientRequester(requester);
        System.out.printf("==patient details==: %s\n", patient);
        Doctor doctor = doctorRepository.findById(request.doctorId())
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found"));

        validateConsultationTime(request.consultationDateTime(), doctor);

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setConsultationDateTime(request.consultationDateTime());
        appointment.setReason(request.reason());

        Appointment saved = appointmentRepository.save(appointment);
        notificationService.notifyNewAppointment(doctor, saved);
        return saved;
    }


    private Patient validatePatientRequester(User requester) {
        if (!(requester instanceof Patient)) {
            throw new AccessDeniedException("Only patients can create appointments");
        }
        return (Patient) requester;
    }

    private void validateConsultationTime(LocalDateTime dateTime, Doctor doctor) {
        if (dateTime.isBefore(LocalDateTime.now().plusHours(24))) {
            throw new IllegalArgumentException("Appointments must be booked at least 24 hours in advance");
        }

        if (appointmentRepository.existsByDoctorIdAndConsultationDateTime(doctor.getId(), dateTime)) {
            throw new IllegalStateException("This time slot is already booked");
        }
    }

    @Transactional
    public Appointment updateStatus(Long id, Appointment.AppointmentStatus status, User user) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        if (appointment.getStatus() == COMPLETED) {
            throw new IllegalStateException("Completed appointments cannot be modified");
        }

        if (user instanceof Doctor && !appointment.getDoctor().equals(user)) {
            throw new AccessDeniedException("Doctors can only modify their own appointments");
        }

        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

//    public List<Appointment> getDoctorAppointments(Long doctorId) {
//        return appointmentRepository.findByDoctorId(doctorId);
//    }

    public List<Appointment> getPatientAppointments(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }
}
