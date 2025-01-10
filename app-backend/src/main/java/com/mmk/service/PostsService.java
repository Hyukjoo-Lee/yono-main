package com.mmk.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.mmk.dto.PostsDTO;

public interface PostsService {

    void save(PostsDTO postsData);

    List<PostsDTO> getAllPosts(); 

    PostsDTO findById(String id);

    void deletePostById(String postId);

    String saveFile(MultipartFile file);

    void updatePost(PostsDTO postsDTO);





}
