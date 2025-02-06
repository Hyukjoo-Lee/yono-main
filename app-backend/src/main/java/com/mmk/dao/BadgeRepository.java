package com.mmk.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mmk.entity.BadgeEntity;

public interface BadgeRepository extends JpaRepository<BadgeEntity, Integer>{
    // 배지 데이터에서 이전 달에 해당하는 데이터를 가져오는 메서드
    List<BadgeEntity> findByBadgeDate(String previousMonth);

    // user 랭킹 가져오기기
    BadgeEntity findByBadgeDateAndUserEntity_UserNum(String previousMonth, int userNum);

    boolean existsByUserEntity_UserNum(int userNum);

    BadgeEntity findByUserEntity_UserNum(int userNum);

    @Query(value = "SELECT r.rank FROM (SELECT b.user_num, RANK() OVER (ORDER BY b.badge DESC, b.current_month_amount DESC) AS rank FROM badge b) r WHERE r.user_num = :userNum", nativeQuery = true)
    Integer getRankingByUserNum(@Param("userNum") int userNum);
}

