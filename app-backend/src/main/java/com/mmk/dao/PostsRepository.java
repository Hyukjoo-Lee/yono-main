package com.mmk.dao;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.PostsEntity;
import com.mmk.entity.UserEntity;


public interface PostsRepository extends JpaRepository<PostsEntity, Integer> {
   List<PostsEntity> findByUserEntity(UserEntity userEntity);
} 