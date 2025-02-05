package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.PostEntity;
import com.mmk.entity.UserEntity;

public interface PostsRepository extends JpaRepository<PostEntity, Integer> {
   List<PostEntity> findByUserEntity(UserEntity userEntity);
}