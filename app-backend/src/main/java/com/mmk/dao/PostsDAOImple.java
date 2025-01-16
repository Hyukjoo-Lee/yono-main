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
    public void save(PostsEntity postsEntity) {
        this.postsRepo.save(postsEntity);
}

    @Override
    public List<PostsEntity> getAllPosts() {
        return this.postsRepo.findAll();
    }

    @Override
    public PostsEntity findById(int userId) {
        // 게시글 ID로 조회
        PostsEntity post = postsRepo.findById(userId).orElse(null); // findById()에서 값이 없으면 null 반환

        if (post == null) {
            throw new RuntimeException("게시글을 찾을 수 없습니다.");
        }
        return post;
    }

@Override
public void deleteById(String postId) {
    // 게시글 ID로 게시글 조회
    Optional<PostsEntity> post = postsRepo.findById(Integer.parseInt(postId)); // String to Integer 변환

    if (post.isPresent()) {
        // 게시글이 존재하면 삭제
        postsRepo.delete(post.get());
    } else {
        // 게시글이 없으면 예외 발생
        throw new RuntimeException("삭제할 게시글이 없습니다. 게시글 ID: " + postId);
    }
}

@Override
public void updateCnt(PostsEntity postEntity) {
    postsRepo.save(postEntity);
}
@Override
public void updatePost(PostsEntity pe) {
    postsRepo.save(pe);
}


}
