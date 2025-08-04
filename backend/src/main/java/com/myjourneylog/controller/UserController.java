package com.myjourneylog.controller;

import com.myjourneylog.dto.UserSignupRequest;
import com.myjourneylog.dto.UserUpdateRequest;
import com.myjourneylog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping(value = "/signup", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<String> signup(@ModelAttribute UserSignupRequest request) {
        userService.signup(request);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PatchMapping(value = "/me", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<String> updateProfile(@ModelAttribute UserUpdateRequest request) {
        userService.updateProfile(request);
        return ResponseEntity.ok("회원 정보 수정 성공");
    }
}
