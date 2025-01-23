package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.CardHistoryEntity;

@Repository
public class DailyStatisticsDAOImpl implements DailyStatisticsDAO {

    @Autowired
    private CardHistoryRepository cardHistoryRepo;

    @Override
    public List<CardHistoryEntity> getDailyStatistics() {
        // Repository의 메서드를 호출해 데이터 처리
        return cardHistoryRepo.findAll();
    }
}
