package com.mmk.dao;

import java.util.List;


import com.mmk.entity.PostsEntity;

public interface PostsDAO {

    void save(PostsEntity postsData);

    List<PostsEntity> getAllPosts();

    PostsEntity findById(int userId);
    
    void updatePost(PostsEntity pe);

    void deleteById(String postId);

    void updateCnt(PostsEntity postEntity);




} 