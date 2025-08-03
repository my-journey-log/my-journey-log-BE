package com.myjourneylog.service;

import com.myjourneylog.customUtil.CustomImageUpload;
import com.myjourneylog.domain.User;
import com.myjourneylog.dto.UserUpdateRequest;
import com.myjourneylog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.myjourneylog.dto.UserSignupRequest;

import java.io.File;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final CustomImageUpload customImageUpload;

    // 회원가입
    public void signup(UserSignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
        if (userRepository.existsByNickname(req.getNickname())) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }
        String encodedPwd = passwordEncoder.encode(req.getPassword());
        String profileImgUrl = "";

        if (req.getProfileImgUrl() != null) {
            profileImgUrl = customImageUpload.uploadMultipleImages(req.getProfileImgUrl());
        }

        User user = User.builder()
                .email(req.getEmail())
                .password(encodedPwd)
                .nickname(req.getNickname())
                .profileImgUrl(profileImgUrl)
                .bio(req.getBio())
                .build();

        userRepository.save(user);
    }

    // 프로필 업데이트
    @Transactional
    public void updateProfile(UserUpdateRequest req) {
        User user = userRepository.findById(req.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        String imgUrl = user.getProfileImgUrl();
        if (!imgUrl.isEmpty()) {
            File f = new File(imgUrl);
            if (f.exists()) {
                f.delete();
            }
        }

        String profileImgUrl = customImageUpload.uploadMultipleImages(req.getProfileImg());

        user.setProfileImgUrl(profileImgUrl);
        user.setNickname(req.getNickname());
        user.setBio(req.getBio());

        userRepository.save(user);
    }

    public List<User> getFollowings(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getFollowings();
    }
}
