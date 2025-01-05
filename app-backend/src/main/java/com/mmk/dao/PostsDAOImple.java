package com.mmk.dao;

import java.util.List;

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
    public PostsEntity findById(int userId) {
        // 게시글 ID로 조회
        PostsEntity post = postsRepo.findById(userId).orElse(null); // findById()에서 값이 없으면 null 반환

        // 값이 없으면 예외를 던짐
        if (post == null) {
            throw new RuntimeException("게시글을 찾을 수 없습니다.");
        }
        return post;
    }

    @Override
    public void deleteById(int userId) {
        this.postsRepo.deleteById(userId);
    }

}
