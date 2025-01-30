package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mmk.entity.BadgeEntity;

@Repository
public interface RankingRepository extends JpaRepository<BadgeEntity, Integer> {
   // 배지 데이터에서 이전 달에 해당하는 데이터를 가져오는 메서드
   List<BadgeEntity> findByBadgeDate(String previousMonth);
}
