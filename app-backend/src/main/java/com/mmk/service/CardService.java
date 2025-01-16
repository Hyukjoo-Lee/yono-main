package com.mmk.service;

import java.util.List;
import java.util.Map;

import com.mmk.dto.CardDTO;

public interface CardService {
    CardDTO createCard(CardDTO cardDTO);

    List<CardDTO> getAllCards();

    void saveCardAndBenefitData(List<Map<String, Object>> cardList, List<Map<String, Object>> performanceList);
}