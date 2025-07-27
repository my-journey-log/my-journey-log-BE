package com.myjourneylog.service;

import java.util.List;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import com.myjourneylog.domain.Place;
import com.myjourneylog.domain.User;
import com.myjourneylog.dto.PlaceCreateRequest;
import com.myjourneylog.dto.PlaceResponse;
import com.myjourneylog.repository.PlaceRepository;
import com.myjourneylog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    private final String uploadDir = "/backend/uploads/";

    public PlaceResponse createPlace(PlaceCreateRequest req) {
        User user = userRepository.findById(req.getCreatedBy())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String imagePath = null;
        if (req.getImage() != null && !req.getImage().isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + req.getImage().getOriginalFilename();
                String fullPath = uploadDir + fileName;
                java.io.File dest = new java.io.File(fullPath);
                dest.getParentFile().mkdirs();
                req.getImage().transferTo(dest);
                imagePath = "/uploads/" + fileName;
            } catch (Exception e) {
                throw new RuntimeException("이미지 저장 실패: " + e.getMessage());
            }
        }

        Place place = Place.builder()
                .name(req.getName())
                .latitude(req.getLatitude())
                .longitude(req.getLongitude())
                .description(req.getDescription())
                .imageUrl(imagePath)
                .category(req.getCategory())
                .createdBy(user)
                .createdAt(LocalDateTime.now())
                .build();

        Place saved = placeRepository.save(place);

        return PlaceResponse.fromEntity(saved);
    }

    public List<PlaceResponse> getAllPlaces() {
        return placeRepository.findAll().stream()
                .map(PlaceResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
