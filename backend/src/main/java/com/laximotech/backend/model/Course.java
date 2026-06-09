package com.laximotech.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String slug;
    private String category;
    private String level;
    private Integer durationHours;
    private Double price;
    private String language;
    private Double rating;
    private Integer totalStudents;
}