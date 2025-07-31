package com.myjourneylog.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
public class UserUpdateRequest {
    private long id;
    private String nickname;
    private String bio;
    private MultipartFile profileImg;
}
