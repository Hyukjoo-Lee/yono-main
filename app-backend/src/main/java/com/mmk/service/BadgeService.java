package com.mmk.service;

import java.util.List;

import com.mmk.dto.BadgeDTO;
import com.mmk.dto.RankingDTO;
import com.mmk.entity.BadgeEntity;

public interface BadgeService {

    void save(BadgeEntity badgeEntity);
    
    RankingDTO getUserRanking(int userNum);

    List<RankingDTO> getBadgesForPreviousMonth();
    
    int calculateUserRank(int userNum);

    boolean existsBadgeForUser(int userNum);

    BadgeDTO updateBadgeByUserNum(int userNum, String yearMonth);

    BadgeEntity findByUserNum(int userNum);

    void updateBadge(String yearMonth);
    
} 
