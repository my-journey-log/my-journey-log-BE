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
    public void create(PostDTO post) {
        Post postEntity = new Post().builder()
                .userId(post.getUserId())
                .placeId(post.getPlaceId())
                .title(post.getTitle())
                .content(post.getContent())
                .imageUrls(post.getImageUrl().toString())
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

        postToUpdate.setTitle(post.getTitle());
        postToUpdate.setContent(post.getContent());
        postToUpdate.setImageUrls(post.getImageUrl().toString());
        postRepository.save(postToUpdate);
    }

    @Transactional
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
