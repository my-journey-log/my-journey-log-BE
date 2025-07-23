package com.myjourneylog.service;

import com.myjourneylog.domain.Place;
import com.myjourneylog.domain.User;
import com.myjourneylog.dto.PlaceCreateRequest;
import com.myjourneylog.dto.PlaceResponse;
import com.myjourneylog.repository.PlaceRepository;
import com.myjourneylog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    public PlaceResponse createPlace(PlaceCreateRequest req) {
        User user = userRepository.findById(req.getCreatedBy())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Place place = Place.builder()
                .name(req.getName())
                .latitude(req.getLatitude())
                .longitude(req.getLongitude())
                .description(req.getDescription())
                .imageUrl(req.getImageUrl())
                .category(req.getCategory())
                .createdBy(user)
                .createdAt(LocalDateTime.now())
                .build();

        Place saved = placeRepository.save(place);

        return PlaceResponse.builder()
                .id(saved.getId())
                .name(saved.getName())
                .latitude(saved.getLatitude())
                .longitude(saved.getLongitude())
                .description(saved.getDescription())
                .imageUrl(saved.getImageUrl())
                .category(saved.getCategory())
                .createdBy(user.getId())
                .build();
    }
}
