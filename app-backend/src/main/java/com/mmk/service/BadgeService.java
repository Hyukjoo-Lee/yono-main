package com.mmk.service;

import java.util.List;

import com.mmk.dto.RankingDTO;

public interface BadgeService {

    void save(int userNum, int badgeCount, String badgeDate, int currentMonthAmount, int previousMonthAmount);
    RankingDTO getUserRanking(int userNum);
    List<RankingDTO> getBadgesForPreviousMonth();
} 
