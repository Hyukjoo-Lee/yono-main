package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mmk.entity.CardHistoryEntity;

public interface CardHistoryRepository extends JpaRepository<CardHistoryEntity, String> {
    
    @Query("SELECT c.resUsedDate FROM CardHistoryEntity c " +
       "WHERE c.userCardEntity.userCardId = :userCardId " +
       "ORDER BY c.resUsedDate DESC LIMIT 1")
    String findMaxResUsedDate(@Param("userCardId") int userCardId);

    @Query("SELECT c FROM CardHistoryEntity c " + 
        "WHERE c.userCardEntity.userCardId = :userCardId AND c.resUsedDate >= :recentDate")
    List<CardHistoryEntity> findRecentHistory(@Param("userCardId") int userCardId, @Param("recentDate") String recentDate);

    // 특정 사용자의 대표카드와 관련된 카드 내역 조회
    @Query("SELECT c FROM CardHistoryEntity c " +
           "WHERE c.userCardEntity.userEntity.userNum = :userNum " +
           "AND c.userCardEntity.primaryCard = 1")
    List<CardHistoryEntity> findByUserNumAndPrimaryCard(@Param("userNum") int userNum);

}