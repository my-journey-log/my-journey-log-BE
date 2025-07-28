package com.myjourneylog.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostDTO {
    private Long id;
    private Long userId;
    private String title;
    private String content;
    private String imageUrl;
}
