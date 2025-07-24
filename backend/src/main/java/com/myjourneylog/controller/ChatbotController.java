package com.myjourneylog.controller;

import com.myjourneylog.dto.ChatbotRequest;
import com.myjourneylog.service.ChatbotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/chatbot")
    public ResponseEntity<String> generateText(@RequestBody ChatbotRequest request) {
        String generatedText = chatbotService.getText(request);
        return ResponseEntity.ok(generatedText);
    }
}
