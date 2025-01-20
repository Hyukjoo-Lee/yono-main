package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mmk.entity.ReplyLikeEntity;

@Repository
public interface ReplyLikeRepository extends JpaRepository<ReplyLikeEntity, Integer> {

	void deleteByRnoAndUserId(int rno, String userId);

    boolean existsByRnoAndUserId(int rno, String userId);

    
}
