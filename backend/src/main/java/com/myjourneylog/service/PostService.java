package com.myjourneylog.service;

import com.myjourneylog.domain.Post;
import com.myjourneylog.dto.PostDTO;
import com.myjourneylog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    @Transactional
    public void create(Post post) {
        postRepository.save(post);
    }

    public List<Post> getPosts(Long userId) {
        return postRepository.findByUserId(userId);
    }

    @Transactional
    public PostDTO getPostById(Long id) {
        Post post = postRepository.findById(id).orElse(null);
        post.setTitle(post.getTitle());
        return new PostDTO(
                post.getId(),
                post.getUserId(),
                post.getTitle(),
                post.getContent(),
                post.getImageUrl()
        );
    }

    @Transactional
    public void updatePost(PostDTO post) {
        Post postToUpdate = postRepository.findById(post.getId()).orElse(null);

        postToUpdate.setTitle(post.getTitle());
        postToUpdate.setContent(post.getContent());
        postToUpdate.setImageUrl(post.getImageUrl());
        postRepository.save(postToUpdate);
    }

    @Transactional
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
