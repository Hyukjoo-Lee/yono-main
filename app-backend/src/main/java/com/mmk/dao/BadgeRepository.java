package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mmk.entity.BadgeEntity;
import com.mmk.entity.CardHistoryEntity;

@Repository
public interface BadgeRepository extends JpaRepository<BadgeEntity, Integer>{
  // 사용자 카드 ID와 시작 날짜를 기준으로 최근 사용 내역 조회
    List<CardHistoryEntity> findByUserCardEntityUserCardIdAndResUsedDateGreaterThanEqual(
            int userCardId, String startDate);

    // 특정 승인번호로 카드 내역 조회
    CardHistoryEntity findByResApprovalNo(String resApprovalNo);
}
