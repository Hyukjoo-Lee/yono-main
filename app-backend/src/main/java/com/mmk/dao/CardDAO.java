package com.mmk.dao;

import java.util.List;

import com.mmk.entity.CardEntity;

public interface CardDAO {
    void createCard(CardEntity cardEntity);

    List<CardEntity> getAllCards();

    // 카드 이름은 고유해야함
    boolean existsByCardTitle(String cardId);
}