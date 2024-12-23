package com.mmk.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.vo.PostsVO;

@Repository
public class PostsDAOImple implements PostsDAO {


    @Autowired
    private PostsRepository postsRepo;
    
    @Override
    public void save(PostsVO postsData) {
        this.postsRepo.save(postsData);
    }

    @Override
    public List<PostsVO> getAllPosts() {
        return this.postsRepo.findAll();
    }

}
