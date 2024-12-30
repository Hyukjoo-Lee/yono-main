package com.mmk.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.PostsEntity;


public interface PostsRepository extends JpaRepository<PostsEntity, Integer> {
   Optional<PostsEntity> findById(int id);
    
} 