package com.myjourneylog.customUtil;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


@Component
public class CustomImageUpload {

    private static final String UPLOAD_DIR = "uploads/";

    public String uploadMultipleImages(MultipartFile file) {
        if (file.isEmpty()) {
            return "No files selected for upload";
        }

        try {
            Path path = Paths.get(UPLOAD_DIR);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            StringBuffer sb = new StringBuffer();
            UUID uuid = UUID.randomUUID();
            String fileName = uuid.toString() + "_" + file.getOriginalFilename();
            String filePath = UPLOAD_DIR + fileName;
            Files.copy(file.getInputStream(), Paths.get(filePath));
            sb.append(filePath);

            return sb.toString();
        } catch (IOException e)
        {
            e.printStackTrace();
            return "";
        }
    }
}
