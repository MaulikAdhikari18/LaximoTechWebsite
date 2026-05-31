package com.laximotech.backend.service;

import com.laximotech.backend.model.*;
import com.laximotech.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public Enrollment enroll(String email, Long courseId) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Course not found"));
        if (enrollmentRepository.existsByUserAndCourse(user, course)) {
            throw new RuntimeException("Already enrolled");
        }
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getMyEnrollments(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return enrollmentRepository.findByUser(user);
    }

    public boolean isEnrolled(String email, Long courseId) {
        User user = userRepository.findByEmail(email).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);
        if (user == null || course == null) return false;
        return enrollmentRepository.existsByUserAndCourse(user, course);
    }
}