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
                    dto.setResApprovalNo(entity.getResApprovalNo());
                    dto.setResUsedDate(entity.getResUsedDate());
                    dto.setResMemberStoreName(entity.getResMemberStoreName());
                    dto.setResUsedAmount(entity.getResUsedAmount());
                    dto.setResMemberStoreType(entity.getResMemberStoreType());

                    dto.setSpendingTarget(entity.getUserCardEntity().getUserEntity().getSpendingTarget());
                    dto.setUserCardId(entity.getUserCardEntity().getUserCardId());
                    dto.setCardTitle(entity.getUserCardEntity().getCardEntity().getCardTitle());
                    dto.setCardImgUrl(entity.getUserCardEntity().getCardEntity().getCardImgUrl());
                    dto.setUserNum(entity.getUserCardEntity().getUserEntity().getUserNum());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
