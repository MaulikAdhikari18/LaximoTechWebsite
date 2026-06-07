package com.laximotech.backend.service;

import com.laximotech.backend.model.Course;
import com.laximotech.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    public Course getCourseBySlug(String slug) {
        return courseRepository.findBySlug(slug).orElse(null);
    }
}