package com.mmk.dao;

import com.mmk.entity.CardBenefitEntity;

public interface CardBenefitDAO {
    void createCardBenefit(CardBenefitEntity cardBenefitEntity);

    // 혜택 ID로 특정 혜택 조회
    CardBenefitEntity getCardBenefitByBenefitId(int benefitId);

    // 혜택 타이틀로 존재 여부 확인
    boolean existsByBenefitTitle(String benefitId);
}
