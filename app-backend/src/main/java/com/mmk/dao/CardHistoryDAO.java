package com.mmk.dao;

import com.mmk.entity.CardHistoryEntity;

public interface CardHistoryDAO {
    void save(CardHistoryEntity cardHistoryEntity);

    String findMaxResUsedDate(int userCardId);
}
