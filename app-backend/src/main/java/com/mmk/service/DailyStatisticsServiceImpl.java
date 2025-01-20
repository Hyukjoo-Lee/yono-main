package com.mmk.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.DailyStatisticsDAO;
import com.mmk.dto.DailyStatisticsDTO;

@Service
public class DailyStatisticsServiceImpl implements DailyStatisticsService {

    @Autowired
    private DailyStatisticsDAO dailyStatisticsDao;

    @Override
    public List<DailyStatisticsDTO> getDailyStatistics() {
        return dailyStatisticsDao.getDailyStatistics().stream()
                .map(entity -> {
                    DailyStatisticsDTO dto = new DailyStatisticsDTO();
                    dto.setDailyId(entity.getDailyId());
                    dto.setUserId(entity.getUserId());
                    dto.setDailyDate(entity.getDailyDate());
                    dto.setDailyTarget(entity.getDailyTarget());
                    dto.setCardImage(entity.getCardImage());
                    dto.setCardName(entity.getCardName());
                    dto.setStore(entity.getStore());
                    dto.setCategory(entity.getCategory());
                    dto.setAmount(entity.getAmount());
                    dto.setCreatedAt(entity.getCreatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}

