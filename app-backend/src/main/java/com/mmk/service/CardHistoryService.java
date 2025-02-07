package com.mmk.service;

import java.util.List;

import com.mmk.dto.CardHistoryDTO;
import com.mmk.dto.CardSummaryDTO;
import com.mmk.dto.DailyStatisticsDTO;
import com.mmk.dto.MonthlySummaryDTO;

public interface CardHistoryService {

    void updateCardHistory(int userNum);

    List<MonthlySummaryDTO> uploadMonthlyHistory(int userNum);

    List<MonthlySummaryDTO> uploadCategoryHistory(int userNum);

    List<CardHistoryDTO> monthData(int userNum);

    // 일별통계
    List<DailyStatisticsDTO> getCardHistoryByUserAndPrimaryCard(int userNum);

    int getMonthlyTotalAmount(int userNum, String yearMonth);

    /**
     * 사용자의 최근 소비 내역을 기반으로 상위 소비 카테고리를 반환
     * 
     * @param userNum 사용자 고유 번호 (UserInfo 테이블의 PK)
     * @return 사용자가 가장 많이 소비한 상위 카테고리 목록 (업종명과 총 사용 금액을 포함)
     */
    List<CardSummaryDTO> getUserTopSpendingCategories(int userNum);
}
