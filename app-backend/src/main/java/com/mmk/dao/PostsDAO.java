package com.mmk.dao;

import java.util.List;


import com.mmk.entity.PostsEntity;

public interface PostsDAO {

    void save(PostsEntity postsEntity);

    List<PostsEntity> getAllPosts();

    PostsEntity findById(int postId);

    void deleteById(String postId);

    void updateCnt(PostsEntity postEntity);

    void updatePost(PostsEntity pe);
}
 