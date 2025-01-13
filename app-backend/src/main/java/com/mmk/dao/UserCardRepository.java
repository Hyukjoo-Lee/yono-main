package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.UserCardEntity;

public interface UserCardRepository extends JpaRepository<UserCardEntity, Integer> {
    boolean existsByUserCardNum(String userCardNum);

    UserCardEntity findByUserEntityUserId(int userId);
}
