package com.myjourneylog.controller;

import com.myjourneylog.domain.Course;
import com.myjourneylog.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<String> saveCourse(@RequestBody List<Course> course) {
        courseService.addCourse(course);
        return ResponseEntity.ok("Course added successfully!");
    }

    @GetMapping
    public ResponseEntity<List<Course>> getCourses(@RequestParam Long userId) {
        List<Course> courses = courseService.getCourses(userId).stream().toList();
        return ResponseEntity.ok(courses);
    }
}
