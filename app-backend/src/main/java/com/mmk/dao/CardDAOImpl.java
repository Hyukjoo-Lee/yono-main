package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.CardEntity;

@Repository
public class CardDAOImpl implements CardDAO {

    @Autowired
    private CardRepository cardRepository;

    @Override
    public void createCard(CardEntity cardEntity) {
        cardRepository.save(cardEntity);
    }

    @Override
    public List<CardEntity> getAllCards() {
        return cardRepository.findAll();
    }

    @Override
    public CardEntity findByCardTitle(String cardTitle) {
        return cardRepository.findByCardTitle(cardTitle);
    }

    @Override
    public boolean existsByCardTitle(String cardTitle) {
        return cardRepository.existsByCardTitle(cardTitle);
    }

    @Override
    public CardEntity findByCardId(int cardId) {
        return cardRepository.findByCardId(cardId);
    }

}
