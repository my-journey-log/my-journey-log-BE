package com.myjourneylog.dto;

import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceResponse {
    private Long id;
    private String name;
    private Double latitude;
    private Double longitude;
    private String description;
    private String imageUrl;
    private String category;
    private Long createdBy;
}
