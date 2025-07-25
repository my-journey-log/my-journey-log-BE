package com.myjourneylog.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.myjourneylog.dto.ChatbotRequest;
import com.myjourneylog.dto.ChatbotResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
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

    public List<ChatbotResponse> getText(ChatbotRequest request) {
        String fullApiUrlString = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("key", apiKey)
                .build().toUriString();

        // Gemini API 요청 본문 생성 (Map 형태로)
        String prompt = createPrompt(request);
        Map<String, Object> requestBody = createGeminiApiRequest(prompt);

        // HTTP 헤더 설정 (Content-Type: application/json)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTP 엔티티 생성 (요청 본문과 헤더 포함)
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            JsonNode geminiApiResponse = restTemplate.postForObject(fullApiUrlString, requestEntity, JsonNode.class);

            if (geminiApiResponse != null && geminiApiResponse.has("candidates")) {
                JsonNode candidates = geminiApiResponse.get("candidates");
                if (candidates.isArray() && candidates.size() > 0) {
                    JsonNode firstCandidate = candidates.get(0);
                    if (firstCandidate.has("content") && firstCandidate.get("content").has("parts")) {
                        JsonNode parts = firstCandidate.get("content").get("parts");
                        if (parts.isArray() && parts.size() > 0 && parts.get(0).has("text")) {
                            String jsonResponseText = parts.get(0).get("text").asText();

                            jsonResponseText = jsonResponseText.replace("#", "").replace("*", "").replace("`", "");

                            return objectMapper.readValue(jsonResponseText,
                                    objectMapper.getTypeFactory().constructCollectionType(List.class, ChatbotResponse.class));
                        }
                    }
                }
            }
            System.err.println("Gemini API response was empty or invalid or missing expected fields: " + geminiApiResponse);
            return Collections.emptyList();
        } catch (HttpClientErrorException e) {
            System.err.println("HTTP Client Error calling Gemini API: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            e.printStackTrace();
            return Collections.emptyList();
        } catch (Exception e) {
            System.err.println("Error calling Gemini API: " + e.getMessage());
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    private String createPrompt(ChatbotRequest request) {
        String promptTemplate = """
            당신은 전문 여행 플래너입니다. 다음 여행 계획에 따라 상세한 여행 코스를 JSON 형식으로 추천해주세요.
            반드시 다음 JSON 스키마를 따르고, 한국어로 내용을 채워주세요.
            JSON만 출력하고 다른 설명은 일절 포함하지 마세요.

            여행 계획:
            - 여행 장소: %s
            - 여행 일정: %s
            - 여행 목적: %s
            혼자 여행을 위해 여행 일정에 맞게 아침, 점심, 저녁으로 코스를 추천해주는데, 일정 단위로 가능하면 거리가 가까웠으면 좋겠어.

            JSON 응답은 다음 형식이어야 합니다:
            ```json
            [
              {
                "day": "[일차 (예: 1일차)]",
                "time": "[시간대 (예: 아침, 점심, 저녁)]",
                "recomm": "[추천 관광지 1곳 & 추천 맛집 1곳]",
                "desc": "추천 관광지 설명\\n추천 맛집 설명"
              }
              // ... (추가적인 일차 및 시간대별 코스) ...
            ]
            ```

            각 일차의 아침, 점심, 저녁 계획을 각각 하나의 객체로 만들어 리스트에 포함해야 합니다.
            "recomm" 필드는 간결하게 추천 관광지 1곳과 추천 맛집 1곳을 "&"로 연결하여 제공해주세요.
            "desc" 필드는 추천 관광지 설명과 추천 맛집 설명을 "\\n"으로 구분하여 상세하게 제공해주세요.
            **마크다운 서식 문자를 절대 사용하지 마세요 (예: #, *, -, >, ` 등).**
            반드시! JSON 형식의 응답으로 제공해주세요.
            """;

        return String.format(promptTemplate,
                request.getPlace(),
                request.getDate(),
                request.getTarget()
        );
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
        generationConfig.put("responseMimeType", "application/json");
        generationConfig.put("responseSchema", createResponseSchema());
        requestMap.put("generationConfig", generationConfig);

        return requestMap;
    }

    private Map<String, Object> createResponseSchema() {
        Map<String, Object> chatbotResponseProperties = new HashMap<>();
        chatbotResponseProperties.put("day", Map.of("type", "STRING"));
        chatbotResponseProperties.put("time", Map.of("type", "STRING"));
        chatbotResponseProperties.put("recomm", Map.of("type", "STRING"));
        chatbotResponseProperties.put("desc", Map.of("type", "STRING"));

        List<String> chatbotResponseRequired = List.of("day", "time", "recomm", "desc");
        Map<String, Object> chatbotResponseSchema = Map.of(
                "type", "OBJECT",
                "properties", chatbotResponseProperties,
                "required", chatbotResponseRequired
        );

        return Map.of(
                "type", "ARRAY",
                "items", chatbotResponseSchema
        );
    }
}
