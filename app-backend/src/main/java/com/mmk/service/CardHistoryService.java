package com.mmk.service;

import java.util.List;

import com.mmk.dto.MonthlySummary;

public interface CardHistoryService {
    void updateCardHistory(int userNum);

    List<MonthlySummary> uploadMonthlyHistory(int userNum);
}
