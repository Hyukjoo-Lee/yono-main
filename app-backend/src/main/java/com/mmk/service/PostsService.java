package com.mmk.service;

import java.util.List;



import com.mmk.dto.PostsDTO;

public interface PostsService {

    void save(PostsDTO postsData);

    List<PostsDTO> getAllPosts();

    void deletePostById(String postId);

    PostsDTO findByIdAndViewCnt(int id);

    void updatePost(PostsDTO postsDTO);

    PostsDTO findById(String postId);
}
