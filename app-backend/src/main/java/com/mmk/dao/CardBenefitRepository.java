package com.mmk.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mmk.entity.CardBenefitEntity;
import com.mmk.entity.CardEntity;

public interface CardBenefitRepository extends JpaRepository<CardBenefitEntity, Integer> {
    boolean existsByBenefitTitle(String benefitTitle);

    CardBenefitEntity findByBenefitId(int benefitId);

    List<CardBenefitEntity> findByCardEntityCardTitle(String cardTitle);

    boolean existsByBenefitTitleAndCardEntity(String benefitTitle, CardEntity cardEntity);

    /**
     * 업종(storeType)에 해당하는 카드 혜택을 조회
     * 
     * 특정 업종(예: 음식점, 쇼핑)과 매칭되는 카드 혜택을 찾고,
     * 동일한 혜택 유형(benefitType)을 가진 혜택 개수(matchCount)를 기준으로 정렬하여 반환합니다.
     * 
     * @param storeType 사용자 소비 내역에서 매칭할 업종명 (예: 음식점, 쇼핑, 교통 등)
     * @return 업종별 매칭되는 카드 혜택 목록 (카드명, 카드 이미지, 혜택 제목, 혜택 유형, 혜택 값, 매칭 개수)
     */
    @Query("SELECT cb.cardEntity.cardTitle AS cardTitle, " +
            "       cb.cardEntity.cardImgUrl AS cardImgUrl, " +
            "       cb.benefitTitle AS benefitTitle, " +
            "       cb.benefitType AS benefitType, " +
            "       cb.benefitValue AS benefitValue, " +
            "       (SELECT COUNT(cb2) " +
            "        FROM CardBenefitEntity cb2 " +
            "        WHERE cb2.cardEntity = cb.cardEntity " +
            "          AND cb2.benefitType = cb.benefitType) AS matchCount " +
            "FROM CardBenefitEntity cb " +
            "WHERE cb.benefitType = :storeType " +
            "ORDER BY matchCount DESC")
    List<Object[]> findMatchingCardBenefits(@Param("storeType") String storeType);

}
