package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.mmk.entity.UserCardEntity;
import com.mmk.entity.UserEntity;

public interface UserCardRepository extends JpaRepository<UserCardEntity, Integer> {
    boolean existsByUserCardNum(String userCardNum);

    // 모든 카드 조회
    List<UserCardEntity> findByUserEntityUserNum(int userNum);

    // 마스터 카드 정보와 혜택을 포함한 모든 카드 조회
    @Query("SELECT uc FROM UserCardEntity uc " +
            "JOIN FETCH uc.cardEntity c " +
            "LEFT JOIN FETCH c.cardBenefits " +
            "WHERE uc.userEntity.userNum = :userNum")
    List<UserCardEntity> findAllByUserNum(@Param("userNum") int userNum);

    @Modifying
    @Transactional
    @Query("UPDATE UserCardEntity u SET u.primaryCard = 0 WHERE u.userEntity.userNum = :userNum")
    void removePrimaryCardAll(@Param("userNum") int userNum);

    UserCardEntity findByUserEntityAndPrimaryCard(UserEntity userEntity, int primaryCard);

    @Modifying
    @Query("UPDATE UserCardEntity u SET u.primaryCard = 1 WHERE u.userCardId = :userCardId")
    void setPrimaryCard(@Param("userCardId") int userCardId);

    UserCardEntity findByUserCardId(int userCardId);
}
