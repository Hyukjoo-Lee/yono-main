package com.mmk.service;

import java.util.List;

import com.mmk.dto.CardBenefitDTO;

public interface CardBenefitService {

    CardBenefitDTO createCardBenefit(CardBenefitDTO cardBenefitDTO);

    List<CardBenefitDTO> getCardBenefitsByCardId(int cardId);

    List<CardBenefitDTO> getCardBenefitsByCardTitle(String cardTitle);

    CardBenefitDTO getCardBenefitByBenefitId(int benefitId);
}
