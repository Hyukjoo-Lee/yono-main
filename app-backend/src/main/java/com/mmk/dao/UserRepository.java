package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.UserInfoEntity;

public interface UserRepository extends JpaRepository<UserInfoEntity, Integer> {
    UserInfoEntity findByUserId(String userId);

    UserInfoEntity findByEmail(String email);

    boolean existsByUserId(String userId);

    boolean existsByEmail(String email);
}
