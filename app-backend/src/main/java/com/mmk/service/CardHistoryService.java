package com.mmk.service;

import java.util.List;

import com.mmk.dto.CardHistoryDTO;
import com.mmk.dto.DailyStatisticsDTO;
import com.mmk.dto.MonthlySummaryDTO;

public interface CardHistoryService {

    void updateCardHistory(int userNum);

    List<MonthlySummaryDTO> uploadMonthlyHistory(int userNum);

    List<MonthlySummaryDTO> uploadCategoryHistory(int userNum);

    List<CardHistoryDTO> monthData(int userNum);

    // 일별통계
    List<DailyStatisticsDTO> getCardHistoryByUserAndPrimaryCard(int userNum);
}
