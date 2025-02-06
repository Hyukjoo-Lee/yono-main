package com.mmk.dao;

import java.util.List;

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

    @Override
    public List<CardHistoryEntity> findRecentHistory(int userCardId, String recentDate) {
        return cardHistoryRepository.findRecentHistory(userCardId, recentDate);
    }

    // 일별통계
    @Override
    public List<CardHistoryEntity> findByUserNumAndPrimaryCard(int userNum) {
        // Repository의 메서드를 호출해 데이터 처리
        return cardHistoryRepository.findByUserNumAndPrimaryCard(userNum);
    }

    @Override
    public List<CardHistoryEntity> findByUserCardIdAndResUsedDateBetween(int userCardId, String startDate,
            String endDate) {
        return cardHistoryRepository.findByUserCardIdAndResUsedDateBetween(userCardId, startDate,endDate);

    }
}

