package com.myjourneylog.controller;

import com.myjourneylog.service.GeminiTextService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Gemini API를 통해 텍스트를 생성하는 REST 컨트롤러입니다.
 * 제공된 main 메소드의 기능을 REST API로 노출합니다.
 */
@RestController
public class GeminiTextController {

    private final GeminiTextService geminiTextService;

    // 생성자 주입을 통해 GeminiTextService를 받습니다.
    public GeminiTextController(GeminiTextService geminiTextService) {
        this.geminiTextService = geminiTextService;
    }

    /**
     * 주어진 프롬프트에 따라 Gemini API로 텍스트를 생성합니다.
     *
     * @param prompt 텍스트 생성을 위한 프롬프트 (예: "Explain how AI works in a few words")
     * @return 생성된 텍스트
     */
    @GetMapping("/generate-text")
    public ResponseEntity<String> generateText(@RequestParam String prompt) {
        String generatedText = geminiTextService.getGeminiText(prompt);
        return ResponseEntity.ok(generatedText);
    }
}
