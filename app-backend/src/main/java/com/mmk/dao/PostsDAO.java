package com.mmk.dao;

import java.util.List;


import com.mmk.entity.PostsEntity;

public interface PostsDAO {
    void save(PostsEntity postsData);

    List<PostsEntity> getAllPosts();

    Object findById(int postId);

    




    
} 