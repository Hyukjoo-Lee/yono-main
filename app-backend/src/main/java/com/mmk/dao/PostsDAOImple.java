package com.mmk.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.mmk.entity.PostsEntity;

@Repository
public class PostsDAOImple implements PostsDAO {


    @Autowired
    private PostsRepository postsRepo;
    
    @Override
    public void save(PostsEntity postsData) {
        this.postsRepo.save(postsData);
    }

    @Override
    public List<PostsEntity> getAllPosts() {
        return this.postsRepo.findAll();
    }

    @Override
    public PostsEntity findById(int postId) {
        Optional<PostsEntity> post = postsRepo.findById(postId); // 게시글 ID로 조회
        
        // Optional에서 값이 존재하지 않으면 예외를 던지도록 처리
        return post.orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다.")); 
    }

}
