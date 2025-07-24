package com.myjourneylog.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ChatbotRequest {
    private String place;
    private String date;
    private String target;
}
