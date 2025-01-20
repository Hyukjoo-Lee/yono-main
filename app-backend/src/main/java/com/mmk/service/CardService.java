package com.mmk.service;

import java.util.List;

import com.mmk.dto.CardDTO;
import com.mmk.entity.CardEntity;

public interface CardService {
    CardDTO createCard(CardDTO cardDTO);

    List<CardDTO> getAllCards();

    CardEntity getByTitle(String string);
}