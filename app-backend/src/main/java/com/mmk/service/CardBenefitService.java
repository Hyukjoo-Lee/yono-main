package com.mmk.service;

import java.util.List;

import com.mmk.dto.CardBenefitDTO;

public interface CardBenefitService {

    CardBenefitDTO createCardBenefit(CardBenefitDTO cardBenefitDTO);

    List<CardBenefitDTO> getCardBenefitByCardId(int cardId);

    List<CardBenefitDTO> getCardBenefitByCardTitle(String cardTitle);

    CardBenefitDTO getCardBenefitByBenefitId(int benefitId);
}
