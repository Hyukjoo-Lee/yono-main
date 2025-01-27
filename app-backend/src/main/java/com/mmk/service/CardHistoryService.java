package com.mmk.service;

import java.util.List;

import com.mmk.dto.DailyStatisticsDTO;
import com.mmk.dto.MonthlySummaryDTO;

public interface CardHistoryService {
    void updateCardHistory(int userNum);

    List<MonthlySummaryDTO> uploadMonthlyHistory(int userNum);

    // 일별통계계
    List<DailyStatisticsDTO> getCardHistoryByUserAndPrimaryCard(int userNum);
}
