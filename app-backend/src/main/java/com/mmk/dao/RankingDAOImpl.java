package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.BadgeEntity;

@Repository
public class RankingDAOImpl implements RankingDAO {

    @Autowired
    private RankingRepository rankingRepository;

    @Override
    public List<BadgeEntity> getBadgesForPreviousMonth(String previousMonth) {
        // BadgeRepository를 통해 이전 달 기준 배지 데이터 조회
        return rankingRepository.findByBadgeDate(previousMonth);
    }

    @Override
    public BadgeEntity getUserRanking(String previousMonth, int userNum) {
        return rankingRepository.findByBadgeDateAndUserEntity_UserNum(previousMonth, userNum);
    }
}
