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
        List<CardHistoryEntity> findRecentHistory(@Param("userCardId") int userCardId,
                        @Param("recentDate") String recentDate);

        // 특정 사용자의 대표카드와 관련된 카드 내역 조회
        @Query("SELECT c FROM CardHistoryEntity c " +
                        "WHERE c.userCardEntity.userEntity.userNum = :userNum " +
                        "AND c.userCardEntity.primaryCard = 1")
        List<CardHistoryEntity> findByUserNumAndPrimaryCard(@Param("userNum") int userNum);

        @Query("SELECT c FROM CardHistoryEntity c WHERE c.userCardEntity.userCardId = :userCardId AND c.resUsedDate BETWEEN :startDate AND :endDate")
        List<CardHistoryEntity> findByUserCardIdAndResUsedDateBetween(
                        @Param("userCardId") int userCardId,
                        @Param("startDate") String startDate,
                        @Param("endDate") String endDate);

        @Query("SELECT c FROM CardHistoryEntity c WHERE c.userCardEntity.userEntity.userNum = :userNum AND c.resUsedDate LIKE CONCAT(:yearMonth, '%') AND c.userCardEntity.primaryCard = 1")
        List<CardHistoryEntity> findByPrimaryAndMonth(
                        @Param("userNum") int userNum,
                        @Param("yearMonth") String yearMonth);

        /**
         * 사용자의 카드 내역에서 가장 많이 사용한 업종을 조회
         * 업종별 총 사용 금액을 합산하고, 가장 많이 소비한 순서로 정렬하여 반환합니다.
         * 
         * @param userNum 사용자 고유 번호 (Primary Key)
         * @return 가장 많이 소비한 업종 정보 (업종명과 총 사용 금액)
         */
        @Query("SELECT c.resMemberStoreType, SUM(CAST(c.resUsedAmount AS long)) AS totalAmount " +
                        "FROM CardHistoryEntity c " +
                        "JOIN c.userCardEntity uc " +
                        "JOIN uc.userEntity u " +
                        "WHERE u.userNum = :userNum " +
                        "GROUP BY c.resMemberStoreType " +
                        "ORDER BY totalAmount DESC")
        List<Object[]> findTopCategories(@Param("userNum") int userNum);

}