package com.mmk.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.PostsDAO;
import com.mmk.vo.PostsVO;

@Service
public class PostsServiceImpl implements PostsService {

    @Autowired
    private PostsDAO postsDao;

    @Override
    public void save(PostsVO postsData) {
        postsDao.save(postsData);
    }

    @Override
    public List<PostsVO> getAllPosts() {
      return this.postsDao.getAllPosts();
    }
    
    
}
