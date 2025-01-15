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
    public List<CardBenefitEntity> getCardBenefitByCardId(int cardId) {
        return cardBenefitRepository.findByCard_CardId(cardId);
    }

    @Override
    public List<CardBenefitEntity> getCardBenefitByCardTitle(String cardTitle) {
        return cardBenefitRepository.findByCard_CardTitle(cardTitle);
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

    @Override
    public boolean existsByCardAndBenefitTitle(CardEntity cardEntity, String benefitTitle) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'existsByCardAndBenefitTitle'");
    }

}
