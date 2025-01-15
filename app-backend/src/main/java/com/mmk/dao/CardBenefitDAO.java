package com.mmk.dao;

import com.mmk.entity.CardBenefitEntity;
import com.mmk.entity.CardEntity;

import java.util.List;

public interface CardBenefitDAO {
    void createCardBenefit(CardBenefitEntity cardBenefitEntity);

    // 카드 ID로 혜택 조회
    List<CardBenefitEntity> getCardBenefitByCardId(int cardId);

    // 카드 이름으로 혜택 조회
    List<CardBenefitEntity> getCardBenefitByCardTitle(String cardTitle);

    // 혜택 ID로 특정 혜택 조회
    CardBenefitEntity getCardBenefitByBenefitId(int benefitId);

    // 혜택 타이틀로 존재 여부 확인
    boolean existsByBenefitTitle(String benefitId);

    boolean existsByCardAndBenefitTitle(CardEntity cardEntity, String benefitTitle);
}
