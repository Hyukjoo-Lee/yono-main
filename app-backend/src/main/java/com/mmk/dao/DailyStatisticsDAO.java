package com.mmk.dao;

import java.util.List;

import com.mmk.entity.CardHistoryEntity;

public interface DailyStatisticsDAO {

    List<CardHistoryEntity> getDailyStatistics();
}
