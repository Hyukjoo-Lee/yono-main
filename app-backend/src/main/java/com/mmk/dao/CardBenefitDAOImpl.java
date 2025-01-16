package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.CardBenefitEntity;
import com.mmk.entity.CardEntity;

@Repository
public class CardBenefitDAOImpl implements CardBenefitDAO {

    @Autowired
    private CardBenefitRepository cardBenefitRepository;

    @Override
    public void createCardBenefit(CardBenefitEntity cardBenefitEntity) {
        cardBenefitRepository.save(cardBenefitEntity);
    }

    @Override
    public CardBenefitEntity getCardBenefitByBenefitId(int benefitId) {
        CardBenefitEntity cardBenefitEntity = cardBenefitRepository.findByBenefitId(benefitId);
        return cardBenefitEntity;
    }

    @Override
    public boolean existsByBenefitTitle(String benefitTitle) {
        return cardBenefitRepository.existsByBenefitTitle(benefitTitle);
    }

}
