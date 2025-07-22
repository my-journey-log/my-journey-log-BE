package com.myjourneylog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security 설정을 정의하는 클래스입니다.
 * 특정 API 경로에 대한 인증 요구 사항을 비활성화합니다.
 */
@Configuration
@EnableWebSecurity // Spring Security 활성화
public class WebSecurityConfig {

    /**
     * HTTP 보안 필터 체인을 설정합니다.
     *
     * @param http HttpSecurity 객체
     * @return 설정된 SecurityFilterChain
     * @throws Exception 예외 발생 시
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF (Cross-Site Request Forgery) 보호를 비활성화합니다.
                // REST API에서는 일반적으로 토큰 기반 인증을 사용하므로 CSRF 보호가 필요하지 않거나 다른 방식으로 처리됩니다.
                .csrf(AbstractHttpConfigurer::disable)
                // HTTP 요청에 대한 접근 권한을 설정합니다.
                .authorizeHttpRequests(authorize -> authorize
                        // "/generate-text" 경로에 대한 모든 요청을 인증 없이 허용합니다.
                        .requestMatchers("/generate-text").permitAll()
                        // 그 외 모든 요청은 인증을 요구합니다. (필요에 따라 변경 가능)
                        .anyRequest().authenticated()
                );
        // 폼 로그인 및 HTTP 기본 인증을 비활성화합니다. (선택 사항, 필요에 따라 활성화 가능)
        // .formLogin(AbstractHttpConfigurer::disable)
        // .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }
}
