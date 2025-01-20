package com.mmk.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.CardHistoryEntity;

@Repository
public class CardHistoryDAOImpl implements CardHistoryDAO {

    @Autowired
    CardHistoryRepository cardHistoryRepository;

    @Override
    public void save(CardHistoryEntity cardHistoryEntity) {
        cardHistoryRepository.save(cardHistoryEntity);
    }

    @Override
    public String findMaxResUsedDate(int userCardId) {
        return cardHistoryRepository.findMaxResUsedDate(userCardId);
    }
}
