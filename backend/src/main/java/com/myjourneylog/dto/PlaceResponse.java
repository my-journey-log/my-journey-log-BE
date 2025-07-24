package com.myjourneylog.dto;
import com.myjourneylog.domain.Place;

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

    public static PlaceResponse fromEntity(Place place) {
        return PlaceResponse.builder()
                .id(place.getId())
                .name(place.getName())
                .latitude(place.getLatitude())
                .longitude(place.getLongitude())
                .description(place.getDescription())
                .imageUrl(place.getImageUrl())
                .category(place.getCategory())
                .createdBy(place.getCreatedBy() != null ? place.getCreatedBy().getId() : null)
                .build();
    }
}
