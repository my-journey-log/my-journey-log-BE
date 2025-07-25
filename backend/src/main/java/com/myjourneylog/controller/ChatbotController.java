package com.myjourneylog.controller;

import com.myjourneylog.dto.ChatbotRequest;
import com.myjourneylog.dto.CourseDTO;
import com.myjourneylog.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class ChatbotController {

    private final ChatbotService chatbotService;

    @PostMapping("/chatbot")
    public ResponseEntity<List<CourseDTO>> generateText(@RequestBody ChatbotRequest request) {
        List<CourseDTO> generatedText = chatbotService.getText(request);
        return ResponseEntity.ok(generatedText);
    }
}
