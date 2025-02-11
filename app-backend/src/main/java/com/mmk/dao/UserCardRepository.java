package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE UserCardEntity u SET u.primaryCard = '일반카드' WHERE u.userEntity.userNum = :userNum")
    void removePrimaryCardAll(@Param("userNum") int userNum);

    UserCardEntity findByUserEntityAndPrimaryCard(UserEntity userEntity, String primaryCard);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE UserCardEntity u SET u.primaryCard = '대표카드' WHERE u.userCardId = :userCardId")
    void setPrimaryCard(@Param("userCardId") int userCardId);

    UserCardEntity findByUserCardId(int userCardId);
}
