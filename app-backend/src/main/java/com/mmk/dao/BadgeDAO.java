package com.mmk.dao;

import java.util.List;

import com.mmk.entity.BadgeEntity;

public interface BadgeDAO {
    void save(BadgeEntity badgeEntity);
    List<BadgeEntity> getBadgesForPreviousMonth(String previousMonth);
    BadgeEntity  getUserRanking(String previousMonth, int userNum);
} 