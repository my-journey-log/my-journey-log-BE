package com.myjourneylog.customUtil;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Component
public class CustomImageUpload {

    private static final String UPLOAD_DIR = "uploads/";

    @Bean
    public String uploadMultipleImages(List<MultipartFile> files) {
        if (files.isEmpty()) {
            return "No files selected for upload";
        }

        try {
            Path path = Paths.get(UPLOAD_DIR);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            for (MultipartFile file: files)
            {
                String fileName = file.getOriginalFilename();
                String filePath = UPLOAD_DIR + fileName;
                Files.copy(file.getInputStream(), Paths.get(filePath));
            }
            return "Multiple images uploaded successfully!";
        } catch (IOException e)
        {
            e.printStackTrace();
            return "Failed to upload image";
        }
    }
}
