package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.BadgeEntity;

@Repository
public class BadgeDAOImpl implements BadgeDAO {
    
    @Autowired
    private BadgeRepository badgeRepository;

    @Override
    public void save(BadgeEntity badgeEntity) {
        badgeRepository.save(badgeEntity);
    }
    
    // 랭킹 정보
    @Override
    public List<BadgeEntity> getBadgesForPreviousMonth(String previousMonth) {
        // BadgeRepository를 통해 이전 달 기준 배지 데이터 조회
        return badgeRepository.findByBadgeDate(previousMonth);
    }

    // 로그인한 유저 랭킹정보
    @Override
    public BadgeEntity getUserRanking(String previousMonth, int userNum) {
        return badgeRepository.findByBadgeDateAndUserEntity_UserNum(previousMonth, userNum);
    }
}
