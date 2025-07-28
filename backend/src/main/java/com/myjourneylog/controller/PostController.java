package com.myjourneylog.controller;

import com.myjourneylog.domain.Post;
import com.myjourneylog.dto.PostDTO;
import com.myjourneylog.service.PostService;
import com.myjourneylog.customUtil.CustomImageUpload;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final CustomImageUpload customImageUpload;

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ResponseEntity<String> createPost(@ModelAttribute PostDTO post) {
        if (post.getImageUrl() != null) {
            customImageUpload.uploadMultipleImages(post.getImageUrl());
        }

        postService.create(post);
        return ResponseEntity.ok("Post created");
    }

    @PostMapping("/posts")
    public List<Post> getPosts(@RequestBody PostDTO reqPost) {
        return postService.getPosts(reqPost.getUserId());
    }

    @PostMapping("/detail")
    public ResponseEntity<Post> getPost(@RequestBody Post reqPost) {
        Post post = postService.getPostById(reqPost.getId());
        return ResponseEntity.ok(post);
    }

    @PatchMapping("/update")
    public ResponseEntity<String> updatePost(@RequestBody PostDTO reqPost) {
        if (reqPost.getImageUrl() != null) {
            customImageUpload.uploadMultipleImages(reqPost.getImageUrl());
        }
        postService.updatePost(reqPost);

        return ResponseEntity.ok("정보 수정 성공");
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok("Post deleted");
    }
}
