package com.mmk.service;

import java.util.List;

import com.mmk.dto.CardDTO;

public interface CardService {
    CardDTO createCard(CardDTO cardDTO);

    List<CardDTO> getAllCards();
}