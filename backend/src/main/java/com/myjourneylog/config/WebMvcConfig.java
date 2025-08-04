package com.myjourneylog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    // application.properties에서 파일 업로드 디렉토리 경로 주입
    @Value("${file.upload-dir}")
    private String uploadDir;

    // application.properties에서 파일 서빙 URL 경로 주입
    @Value("${file.serve-url}")
    private String serveUrl; // 예: "/files/"

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // serveUrl (예: /files/) 뒤에 오는 모든 경로 (**)에 대해 요청이 들어오면,
        // 실제 파일이 저장된 로컬 디렉토리(file:./uploads/)에서 파일을 찾아서 제공
        registry.addResourceHandler(serveUrl + "**") // 예: /files/**
                .addResourceLocations("file:" + uploadDir); // 예: file:./uploads/
    }
}
