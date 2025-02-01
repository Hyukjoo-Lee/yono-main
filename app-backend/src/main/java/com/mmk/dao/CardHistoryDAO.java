package com.mmk.dao;

import java.util.List;

import com.mmk.entity.CardHistoryEntity;

public interface CardHistoryDAO {

    void save(CardHistoryEntity cardHistoryEntity);

    String findMaxResUsedDate(int userCardId);

    List<CardHistoryEntity> findRecentHistory(int userCardId, String recentDate);

    // 일별 통계
    List<CardHistoryEntity> findByUserNumAndPrimaryCard(int userNum);
}
