package com.myjourneylog.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
public class PlaceCreateRequest {
    private String name;
    private Double latitude;
    private Double longitude;
    private String description;
    private String category;
    private Long createdBy;

    private MultipartFile image;
}
