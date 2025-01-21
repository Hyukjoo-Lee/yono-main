package com.mmk.service;

import java.util.List;

import com.mmk.dto.MonthlySummaryDTO;

public interface CardHistoryService {
    void updateCardHistory(int userNum);

    List<MonthlySummaryDTO> uploadMonthlyHistory(int userNum);
}
