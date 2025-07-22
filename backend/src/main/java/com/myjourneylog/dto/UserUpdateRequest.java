package com.myjourneylog.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserUpdateRequest {
    private String nickname;
    private String profileImgUrl;
    private String bio;
}
