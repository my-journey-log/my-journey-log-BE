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

    @Value("${gemini.api-key}")
    private String apiKey;

    @Value("${gemini.api-url}")
    private String apiUrl;

    public ChatbotService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getText(ChatbotRequest request) {
        String fullApiUrlString = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("key", apiKey)
                .build().toUriString();

        // Gemini API 요청 본문 생성 (Map 형태로)
        String prompt = createPrompt(request);
        Map<String, Object> requestBody = createGeminiApiRequest(prompt.toString());

        // HTTP 헤더 설정 (Content-Type: application/json)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTP 엔티티 생성 (요청 본문과 헤더 포함)
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            JsonNode geminiApiResponse = restTemplate.postForObject(fullApiUrlString, requestEntity, JsonNode.class);
            if (geminiApiResponse != null && geminiApiResponse.has("candidates")) {
                String generatedText = geminiApiResponse.path("candidates").path(0).path("content").path("parts").path(0).path("text").asText();
                if (!generatedText.isEmpty()) { // 빈 문자열이 아니면 유효한 응답으로 간주
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

    private String createPrompt(ChatbotRequest request) {
        String promptTemplate = """
            당신은 전문 여행 플래너입니다. 다음 여행 계획에 따라 상세한 여행 코스를 반드시 JSON 형식으로 추천해주세요.
            반드시 다음 JSON 스키마를 따르고, 한국어로 내용을 채워주세요.
            JSON만 출력하고 다른 설명은 일절 포함하지 마세요.

            여행 계획:
            - 여행 장소: %s
            - 여행 일정: %s
            - 여행 목적: %s
            혼자 여행을 위해 여행 일정에 맞게 아침, 점심, 저녁으로 코스를 추천해주는데, 일정 단위로 가능하면 거리가 가까웠으면 좋겠어.

            JSON 응답은 다음 형식이어야 합니다:
            ```json
            {
              "destination": "[여행 목적지]",
              "dailyPlans": [
                {
                  "day": 1,
                  "morning": { "recommendation": "[추천 관광 & 추천 맛집]", "description": "- 추천 관광지 설명\\n- 추천 맛집 설명" },
                  "lunch": { "recommendation": "[추천 관광 & 추천 맛집]", "description": "- 추천 관광지 설명\\n- 추천 맛집 설명" },
                  "dinner": { "recommendation": "[추천 관광 & 추천 맛집]", "description": "- 추천 관광지 설명\\n- 추천 맛집 설명" }
                }
              ]
            }
            ```

            각 일자에 대해 아침, 점심, 저녁 계획을 포함해야 합니다. recommendation은 간결하게 추천 관광지 1곳, 추천 맛집 1곳을, description은 상세하게 설명해주세요.
            마크다운 표시를 제거하고 제공해주세요 (제거대상: #, *).
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
        generationConfig.put("responseMimeType", "text/plain");
        requestMap.put("generationConfig", generationConfig);

        return requestMap;
    }
}
