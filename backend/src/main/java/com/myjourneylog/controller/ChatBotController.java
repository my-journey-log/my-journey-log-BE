package com.myjourneylog.controller;

import com.myjourneylog.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ChatBotController {

    private final ChatbotService chatbotService;

    public ChatBotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @GetMapping("/chatbot")
    public ResponseEntity<String> generateText(@RequestParam String prompt) {
        String generatedText = chatbotService.getText(prompt);
        return ResponseEntity.ok(generatedText);
    }
}
