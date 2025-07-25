package com.myjourneylog.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.myjourneylog.dto.ChatbotRequest;
import com.myjourneylog.dto.ChatbotResponse;
import com.myjourneylog.service.ChatbotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/chatbot")
    public ResponseEntity<List<ChatbotResponse>> generateText(@RequestBody ChatbotRequest request) {
        List<ChatbotResponse> generatedText = chatbotService.getText(request);
        return ResponseEntity.ok(generatedText);
    }
}
