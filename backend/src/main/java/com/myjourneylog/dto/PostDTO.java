package com.myjourneylog.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostDTO {
    private Long id;
    private Long userId;
    private Long placeId;
    private String title;
    private String content;
    private List<MultipartFile> imageUrl;
}
