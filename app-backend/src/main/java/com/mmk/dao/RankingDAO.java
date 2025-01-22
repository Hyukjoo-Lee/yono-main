package com.mmk.dao;

import java.util.List;
import java.util.Optional;

import com.mmk.entity.RankingEntity;

public interface RankingDAO {
    List<RankingEntity> getAllRankings();
    void saveAll(List<RankingEntity> rankings);
    Optional<RankingEntity> findByBadgeNum(int badgeNum);
    void updateRankings();
}
