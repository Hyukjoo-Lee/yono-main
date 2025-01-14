package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.mmk.entity.UserCardEntity;

public interface UserCardRepository extends JpaRepository<UserCardEntity, Integer> {
    boolean existsByUserCardNum(String userCardNum);

    // UserCardEntity findUserCardEntityByUserId(int userId);

    @Modifying
    @Transactional
    @Query("UPDATE UserCardEntity u SET u.primaryCard = 0 WHERE u.userEntity.userNum = :userNum")
    void removePrimaryCardAll(@Param("userNum") int userNum);
}
