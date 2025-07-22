package com.myjourneylog.service;

import com.myjourneylog.domain.User;
import com.myjourneylog.dto.UserSignupRequest;
import com.myjourneylog.dto.UserUpdateRequest;
import com.myjourneylog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User signup(UserSignupRequest req) {
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

        return userRepository.save(user);
    }

    public void updateProfile(UserUpdateRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(request.getNickname() != null) user.setNickname(request.getNickname());
        if(request.getProfileImgUrl() != null) user.setProfileImgUrl(request.getProfileImgUrl());
        if(request.getBio() != null) user.setBio(request.getBio());

        userRepository.save(user);
    }
}
