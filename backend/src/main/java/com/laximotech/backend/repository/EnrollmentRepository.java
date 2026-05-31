package com.laximotech.backend.repository;

import com.laximotech.backend.model.Enrollment;
import com.laximotech.backend.model.User;
import com.laximotech.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUser(User user);
    Optional<Enrollment> findByUserAndCourse(User user, Course course);
    boolean existsByUserAndCourse(User user, Course course);
}