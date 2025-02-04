package com.mmk.service;

import java.util.List;

import com.mmk.dto.RankingDTO;

public interface BadgeService {

    void save(int userNum, int badgeCount, String badgeDate, int currentMonthAmount, int previousMonthAmount, int ranking);
    RankingDTO getUserRanking(int userNum);
    List<RankingDTO> getBadgesForPreviousMonth();
    int calculateUserRank(int userNum);
    boolean existsBadgeForUserAndDate(int userNum, String badgeDate);
} 
