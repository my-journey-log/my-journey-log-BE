package com.myjourneylog.service;

import com.myjourneylog.domain.User;
import com.myjourneylog.dto.UserSignupRequest;
import com.myjourneylog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User signup(UserSignupRequest req) {
        // 이메일/닉네임 중복체크
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
        if (userRepository.existsByNickname(req.getNickname())) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }
        // 비밀번호 암호화
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
}
