package com.laximotech.backend.controller;

import com.laximotech.backend.config.JwtUtil;
import com.laximotech.backend.model.Enrollment;
import com.laximotech.backend.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    private final JwtUtil jwtUtil;

    private String getEmailFromToken(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return jwtUtil.extractEmail(token);
    }

    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<?> enroll(
        @RequestHeader("Authorization") String authHeader,
        @PathVariable Long courseId
    ) {
        try {
            String email = getEmailFromToken(authHeader);
            Enrollment e = enrollmentService.enroll(email, courseId);
            return ResponseEntity.ok(Map.of("message", "Enrolled successfully", "enrollmentId", e.getId()));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/my-courses")
    public ResponseEntity<?> getMyCourses(
        @RequestHeader("Authorization") String authHeader
    ) {
        try {
            String email = getEmailFromToken(authHeader);
            List<Enrollment> enrollments = enrollmentService.getMyEnrollments(email);
            return ResponseEntity.ok(enrollments);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/check/{courseId}")
    public ResponseEntity<?> checkEnrollment(
        @RequestHeader("Authorization") String authHeader,
        @PathVariable Long courseId
    ) {
        try {
            String email = getEmailFromToken(authHeader);
            boolean enrolled = enrollmentService.isEnrolled(email, courseId);
            return ResponseEntity.ok(Map.of("enrolled", enrolled));
        } catch (RuntimeException ex) {
            return ResponseEntity.ok(Map.of("enrolled", false));
        }
    }
}