package com.myjourneylog.service;

import com.myjourneylog.domain.Course;
import com.myjourneylog.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public void addCourse(List<Course> course) {
        if (course.isEmpty()) {
            return;
        }
        courseRepository.saveAll(course);
    }

    public List<Course> getCourses(Long userId) {
        return courseRepository.findByUserId(userId);
    }
}
