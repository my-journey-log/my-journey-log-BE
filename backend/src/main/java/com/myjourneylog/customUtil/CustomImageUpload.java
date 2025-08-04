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

    private static final String UPLOAD_DIR = "./uploads/";
    private static final String FILE_SERVE_URL = "/files/";

    public String uploadMultipleImages(MultipartFile file) {
        if (file.isEmpty()) {
            return "No files selected for upload";
        }

        try {
            Path path = Paths.get(UPLOAD_DIR);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            UUID uuid = UUID.randomUUID();
            String fileName = uuid.toString() + "_" + file.getOriginalFilename();
            String filePath = UPLOAD_DIR + fileName;
            Files.copy(file.getInputStream(), Paths.get(filePath));

            return fileName;
        } catch (IOException e)
        {
            e.printStackTrace();
            return "";
        }
    }

    public String uploadFilePath(String file) {
        return UPLOAD_DIR + file;
    }

    public String GetPullUrl(String file) {
        return FILE_SERVE_URL + file;
    }
}
