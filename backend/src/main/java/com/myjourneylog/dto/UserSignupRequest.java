package com.myjourneylog.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserSignupRequest {
    private String email;
    private String password;
    private String nickname;
    private String profileImgUrl;
    private String bio;
}
