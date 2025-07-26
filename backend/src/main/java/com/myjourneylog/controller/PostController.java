package com.myjourneylog.controller;

import com.myjourneylog.domain.Post;
import com.myjourneylog.dto.PostDTO;
import com.myjourneylog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("create")
    public ResponseEntity<String> createPost(@RequestBody Post post) {
        postService.create(post);
        return ResponseEntity.ok("Post created");
    }

    @PostMapping("posts")
    public List<Post> getPosts(@RequestBody PostDTO reqPost) {
        return postService.getPosts(reqPost.getUserId());
    }

    @PostMapping("/detail")
    public ResponseEntity<PostDTO> getPost(@RequestBody PostDTO reqPost) {
        PostDTO post = postService.getPostById(reqPost.getId());
        return ResponseEntity.ok(post);
    }

    @PatchMapping("/update")
    public ResponseEntity<String> updatePost(@RequestBody PostDTO reqPost) {
        postService.updatePost(reqPost);

        return ResponseEntity.ok("정보 수정 성공");
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok("Post deleted");
    }
}
