package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mmk.entity.CardHistoryEntity;

public interface CardHistoryRepository extends JpaRepository<CardHistoryEntity, String> {
        @Query("SELECT MAX(c.resUsedDate) FROM CardHistoryEntity c where c.userCardEntity.userCardId = :userCardId")
        String findMaxResUsedDate(@Param("userCardId") int userCardId);

        @Query("SELECT c FROM CardHistoryEntity c WHERE c.userCardEntity.userCardId = :userCardId AND c.resUsedDate >= :recentDate")
        List<CardHistoryEntity> findRecentHistory(@Param("userCardId") int userCardId, @Param("recentDate") String recentDate);

        @Query("SELECT c FROM CardHistoryEntity c WHERE c.userCardEntity.userCardId = :userCardId AND c.resUsedDate BETWEEN :startDate AND :endDate")
        List<CardHistoryEntity> findByUserCardIdAndResUsedDateBetween(
                @Param("userCardId") int userCardId,
                @Param("startDate") String startDate,
                @Param("endDate") String endDate);
}