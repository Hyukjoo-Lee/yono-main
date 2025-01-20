package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mmk.entity.CardHistoryEntity;

public interface CardHistoryRepository extends JpaRepository<CardHistoryEntity, String> {
    
    @Query("SELECT MAX(c.resUsedDate) FROM CardHistoryEntity c where c.userCardEntity.userCardId = :userCardId")
    String findMaxResUsedDate(int userCardId);

    @Query("SELECT c FROM CardHistoryEntity c WHERE c.userCardEntity.userCardId = :userCardId AND c.resUsedDate >= :recentDate")
    List<CardHistoryEntity> findRecentHistory(int userCardId, String recentDate);
}