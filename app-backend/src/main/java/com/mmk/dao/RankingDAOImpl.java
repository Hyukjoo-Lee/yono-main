package com.mmk.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.RankingEntity;

@Repository
public class RankingDAOImpl implements RankingDAO {

    @Autowired
    private RankingRepository rankingRepo;

    @Override
    public List<RankingEntity> getAllRankings() {
        return rankingRepo.findAll();
    }
    
    @Override
    public void saveAll(List<RankingEntity> rankings) {
        rankingRepo.saveAll(rankings);
    }

    @Override
    public Optional<RankingEntity> findByBadgeNum(int badgeNum) {
        return rankingRepo.findByBadgeEntity_BadgeNum(badgeNum);
    }

    @Override
    public void updateRankings() {
        rankingRepo.updateRankings();
    }
}
