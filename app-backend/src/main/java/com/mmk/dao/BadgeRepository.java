package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.BadgeEntity;

public interface BadgeRepository extends JpaRepository<BadgeEntity, Integer>{
    // 배지 데이터에서 이전 달에 해당하는 데이터를 가져오는 메서드
    List<BadgeEntity> findByBadgeDate(String previousMonth);

    // user 랭킹 가져오기기
    BadgeEntity findByBadgeDateAndUserEntity_UserNum(String previousMonth, int userNum);
}
