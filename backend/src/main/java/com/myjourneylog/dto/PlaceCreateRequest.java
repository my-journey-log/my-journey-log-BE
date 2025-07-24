package com.myjourneylog.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceCreateRequest {
    private String name;
    private Double latitude;
    private Double longitude;
    private String description;
    private String imageUrl;
    private String category;
    private Long createdBy;
}
