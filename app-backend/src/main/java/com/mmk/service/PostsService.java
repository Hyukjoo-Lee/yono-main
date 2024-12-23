package com.mmk.service;

import java.util.List;

import com.mmk.vo.PostsVO;

public interface PostsService {

    void save(PostsVO postsData);

    List<PostsVO> getAllPosts();
    
}
