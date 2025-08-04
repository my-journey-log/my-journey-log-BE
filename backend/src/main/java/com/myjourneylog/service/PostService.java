package com.myjourneylog.service;

import com.myjourneylog.domain.Post;
import com.myjourneylog.dto.PostDTO;
import com.myjourneylog.repository.PostRepository;
import com.myjourneylog.customUtil.CustomImageUpload;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final CustomImageUpload customImageUpload;

    private List<MultipartFile> images;

    @Transactional
    public void create(PostDTO post) {

        ArrayList<String> imagesToString = new ArrayList<>();
        imagesToString = saveToImages(post);
        Post postEntity = new Post().builder()
                .userId(post.getUserId())
                .placeId(post.getPlaceId())
                .title(post.getTitle())
                .content(post.getContent())
                .imageUrls(imagesToString)
                .build();
        postRepository.save(postEntity);
    }

    public List<Post> getPosts(Long userId) {
        return postRepository.findByUserId(userId);
    }

    @Transactional
    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);

    }

    @Transactional
    public void updatePost(PostDTO post) {
        Post postToUpdate = postRepository.findById(post.getId()).orElse(null);
        ArrayList<String> imagesToString = new ArrayList<>();
        imagesToString = saveToImages(post);

        postToUpdate.setTitle(post.getTitle());
        postToUpdate.setContent(post.getContent());
        postToUpdate.setImageUrls(imagesToString);
        postRepository.save(postToUpdate);
    }

    @Transactional
    public void deletePost(Long id) {
        Post post = postRepository.findById(id).orElse(null);
        for (String image : post.getImageUrls()) {
            File f = new File(image);
            if (f.exists()) {
                f.delete();
            }
        }

        postRepository.deleteById(id);
    }

    private ArrayList<String> saveToImages(PostDTO post) {
        images = post.getImageUrl();
        ArrayList<String> imagesToString = new ArrayList<String>() {};

        if (images != null) {
            for (MultipartFile file : images) {
                String image = customImageUpload.uploadMultipleImages(file);
                imagesToString.add(image);
            }
        }
        return imagesToString;
    }
}
