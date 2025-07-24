package com.myjourneylog.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.myjourneylog.dto.ChatbotRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatbotService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api-key}")
    private String apiKey;

    @Value("${gemini.api-url}")
    private String apiUrl;

    public ChatbotService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public String getText(ChatbotRequest request) {
        String fullApiUrlString = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("key", apiKey)
                .build().toUriString();

        // Gemini API 요청 본문 생성 (Map 형태로)
        StringBuilder prompt = new StringBuilder();
        prompt.append("여행 장소: ").append(request.getPlace()).append("\n");
        prompt.append("여행 일정: ").append(request.getDate()).append("\n");
        prompt.append("여행 목적: ").append(request.getTarget()).append("\n");
        prompt.append("혼자 여행을 위해 여행 일정에 맞게 아침, 점심, 저녁으로 코스 추천해줘");
        Map<String, Object> requestBody = createGeminiApiRequest(prompt.toString());

        // HTTP 헤더 설정 (Content-Type: application/json)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTP 엔티티 생성 (요청 본문과 헤더 포함)
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            // RestTemplate을 사용하여 POST 요청 전송
            // 응답을 JsonNode로 받아서 직접 파싱합니다.
            JsonNode geminiApiResponse = restTemplate.postForObject(fullApiUrlString, requestEntity, JsonNode.class);
            if (geminiApiResponse != null && geminiApiResponse.has("candidates")) {
                String generatedText = geminiApiResponse.path("candidates").path(0).path("content").path("parts").path(0).path("text").asText();
                if (!generatedText.isEmpty()) { // 빈 문자열이 아니면 유효한 응답으로 간주
                    System.out.println("Gemini Raw Response: " + generatedText);
                    return generatedText;
                }
            }
            System.err.println("Gemini API response was empty or invalid or missing expected fields: " + geminiApiResponse);
            return "Error: Gemini API 응답이 비어있거나 유효하지 않거나 예상 필드가 누락되었습니다.";
        } catch (HttpClientErrorException e) {
            System.err.println("HTTP Client Error calling Gemini API: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            e.printStackTrace();
            return "Error: Gemini API 호출 중 HTTP 오류가 발생했습니다: " + e.getStatusCode() + " - " + e.getResponseBodyAsString();
        } catch (Exception e) {
            System.err.println("Error calling Gemini API: " + e.getMessage());
            e.printStackTrace();
            return "Error: Gemini API 호출 중 알 수 없는 오류가 발생했습니다: " + e.getMessage();
        }
    }

    private Map<String, Object> createGeminiApiRequest(String prompt) {
        Map<String, Object> requestMap = new HashMap<>();

        // 'contents' 부분
        Map<String, Object> content = new HashMap<>();
        content.put("role", "user");
        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);
        content.put("parts", List.of(part));
        requestMap.put("contents", List.of(content));

        // 'generationConfig' 부분
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("responseMimeType", "text/plain");
        requestMap.put("generationConfig", generationConfig);

        return requestMap;
    }
}
