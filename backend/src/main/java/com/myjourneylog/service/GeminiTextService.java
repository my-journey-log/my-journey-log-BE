package com.myjourneylog.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Gemini API를 직접 호출하여 텍스트를 생성하는 서비스 클래스입니다.
 * DTO 클래스 없이 Map과 JsonNode를 사용하여 요청/응답을 처리합니다.
 */
@Service
public class GeminiTextService {

    private final UriComponents fullApiUrl;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper; // JSON 파싱을 위한 ObjectMapper

    public GeminiTextService(UriComponents fullApiUrl, RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.fullApiUrl = fullApiUrl;
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public String getGeminiText(String prompt) {
        // Gemini API 요청 본문 생성 (Map 형태로)
        Map<String, Object> requestBody = createGeminiApiRequest(prompt);

        // HTTP 헤더 설정 (Content-Type: application/json)
        HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTP 엔티티 생성 (요청 본문과 헤더 포함)
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

            try {
            // RestTemplate을 사용하여 POST 요청 전송
            // 응답을 JsonNode로 받아서 직접 파싱합니다.
            JsonNode geminiApiResponse = restTemplate.postForObject(fullApiUrl.toUriString(), requestEntity, JsonNode.class);

            if (geminiApiResponse != null && geminiApiResponse.has("candidates")) {
                JsonNode candidates = geminiApiResponse.get("candidates");
                if (candidates.isArray() && candidates.size() > 0) {
                    JsonNode firstCandidate = candidates.get(0);
                    if (firstCandidate.has("content") && firstCandidate.get("content").has("parts")) {
                        JsonNode parts = firstCandidate.get("content").get("parts");
                        if (parts.isArray() && parts.size() > 0 && parts.get(0).has("text")) {
                            String generatedText = parts.get(0).get("text").asText();
                            System.out.println("Gemini Raw Response: " + generatedText); // 디버깅용
                            return generatedText;
                        }
                    }
                }
            }
            System.err.println("Gemini API response was empty or invalid: " + geminiApiResponse);
            return "Error: Gemini API 응답이 비어있거나 유효하지 않습니다.";

        } catch (HttpClientErrorException e) {
            // HTTP 클라이언트 오류 (예: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
            System.err.println("HTTP Client Error calling Gemini API: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            e.printStackTrace();
            return "Error: Gemini API 호출 중 HTTP 오류가 발생했습니다: " + e.getStatusCode() + " - " + e.getResponseBodyAsString();
        } catch (Exception e) {
            // 기타 예외 (IO 오류, JSON 파싱 오류 등)
            System.err.println("Error calling Gemini API: " + e.getMessage());
            e.printStackTrace();
            return "Error: Gemini API 호출 중 알 수 없는 오류가 발생했습니다: " + e.getMessage();
        }
    }


    /**
     * Gemini API 요청 본문을 Map 형태로 생성합니다.
     */
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
        generationConfig.put("responseMimeType", "text/plain"); // 텍스트 응답을 위한 설정
        requestMap.put("generationConfig", generationConfig);

        return requestMap;
    }

}
