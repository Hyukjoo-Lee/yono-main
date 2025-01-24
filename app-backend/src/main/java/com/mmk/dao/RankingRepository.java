package com.mmk.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mmk.entity.RankingEntity;

@Repository
public interface RankingRepository extends JpaRepository<RankingEntity, Integer> {

    Optional<RankingEntity> findByBadgeEntity_BadgeNum(int badgeNum);

    // 등수를 계산하여 ranking 테이블에 업데이트
    @Modifying
    @Transactional
    @Query(value = """
        MERGE INTO ranking r
        USING (
            SELECT 
                b.badge_num,
                b.user_num,
                b.badge,
                DENSE_RANK() OVER (ORDER BY b.badge DESC) AS ranking_position
            FROM badge b
        ) rb
        ON (r.badge_num = rb.badge_num)
        WHEN MATCHED THEN
            UPDATE SET r.ranking_position = rb.ranking_position
        WHEN NOT MATCHED THEN
            INSERT (ranking_num, badge_num, user_num, ranking_position)
            VALUES (ranking_seq.nextval, rb.badge_num, rb.user_num, rb.ranking_position)
    """, nativeQuery = true)
    void updateRankings();
}
