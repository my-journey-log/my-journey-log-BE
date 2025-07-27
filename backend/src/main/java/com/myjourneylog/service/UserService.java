package com.myjourneylog.service;

import com.myjourneylog.domain.User;
import com.myjourneylog.dto.UserUpdateRequest;
import com.myjourneylog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.myjourneylog.dto.UserSignupRequest;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final String uploadDir = "/backend/uploads/";

    public void signup(UserSignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
        if (userRepository.existsByNickname(req.getNickname())) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }
        String encodedPwd = passwordEncoder.encode(req.getPassword());

        User user = User.builder()
                .email(req.getEmail())
                .password(encodedPwd)
                .nickname(req.getNickname())
                .profileImgUrl(req.getProfileImgUrl())
                .bio(req.getBio())
                .build();

        userRepository.save(user);
    }

    @Transactional
    public void updateProfile(UserUpdateRequest req) {
        User user = userRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setNickname(req.getNickname());
        user.setBio(req.getBio());

        if (req.getProfileImg() != null && !req.getProfileImg().isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + req.getProfileImg().getOriginalFilename();
                String fullPath = uploadDir + fileName;
                java.io.File dest = new java.io.File(fullPath);
                dest.getParentFile().mkdirs();
                req.getProfileImg().transferTo(dest);
                user.setProfileImgUrl("/uploads/" + fileName);
            } catch (Exception e) {
                throw new RuntimeException("프로필 이미지 저장 실패: " + e.getMessage());
            }
        }

        userRepository.save(user);
    }
}
