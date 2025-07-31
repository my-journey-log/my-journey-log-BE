package com.myjourneylog.controller;

import com.myjourneylog.dto.PlaceCreateRequest;
import com.myjourneylog.dto.PlaceResponse;
import com.myjourneylog.service.PlaceService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/places")
@RequiredArgsConstructor
public class PlaceController {

    private final PlaceService placeService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<PlaceResponse> createPlace(@ModelAttribute PlaceCreateRequest request) {
        return ResponseEntity.ok(placeService.createPlace(request));
    }

    @GetMapping
    public List<PlaceResponse> getAllPlaces() {
        return placeService.getAllPlaces();
    }
}
