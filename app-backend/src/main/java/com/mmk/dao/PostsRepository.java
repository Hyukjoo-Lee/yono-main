package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.vo.PostsVO;

public interface PostsRepository extends JpaRepository<PostsVO, Integer> {

    
} 