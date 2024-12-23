package com.mmk.dao;

import java.util.List;

import com.mmk.vo.PostsVO;

public interface PostsDAO {
    void save(PostsVO postsData);

    List<PostsVO> getAllPosts();

    
} 