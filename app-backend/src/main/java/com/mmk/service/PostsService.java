package com.mmk.service;

import java.util.List;



import com.mmk.dto.PostsDTO;

public interface PostsService {

    void save(PostsDTO postsData);

    List<PostsDTO> getAllPosts(); 

    void deletePostById(String postId);

    void updatePost(PostsDTO postsDTO);

    PostsDTO findByIdAndViewCnt(int id);





}
