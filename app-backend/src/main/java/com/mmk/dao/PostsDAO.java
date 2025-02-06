package com.mmk.dao;

import java.util.List;

import com.mmk.entity.PostEntity;

public interface PostsDAO {

    void save(PostEntity postsEntity);

    List<PostEntity> getAllPosts();

    PostEntity findById(int postId);

    void deleteById(String postId);

    void updateCnt(PostEntity postEntity);

    void updatePost(PostEntity pe);
}
