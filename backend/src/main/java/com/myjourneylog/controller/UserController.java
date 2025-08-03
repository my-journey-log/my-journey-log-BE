package com.myjourneylog.controller;

import com.myjourneylog.dto.UserSignupRequest;
import com.myjourneylog.dto.UserUpdateRequest;
import com.myjourneylog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // 회원가입
    @PostMapping(value = "/signup", consumes = {"multipart/form-data"})
    public ResponseEntity<String> signup(@ModelAttribute UserSignupRequest request) {
        userService.signup(request);
        return ResponseEntity.ok("회원가입 성공");
    }

    // 프로필 업데이트
    @PatchMapping(value = "/me", consumes = {"multipart/form-data"})
    public ResponseEntity<String> updateProfile(@ModelAttribute UserUpdateRequest request) {
        userService.updateProfile(request);
        return ResponseEntity.ok("회원 정보 수정 성공");
    }

    // 팔로잉 목록 조회
    @GetMapping("/followings")
    public ResponseEntity<List<User>> getFollowings(@RequestParam Long userId) {
        List<User> followings = userService.getFollowings(userId);
        return ResponseEntity.ok(followings);
    }
}
