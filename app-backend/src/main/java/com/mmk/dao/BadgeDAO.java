package com.mmk.dao;

import java.util.List;

import com.mmk.entity.CardHistoryEntity;

public interface BadgeDAO {
  List<CardHistoryEntity> findRecentHistory(int userCardId, String startDate);
  void save(CardHistoryEntity cardHistoryEntity);
}
