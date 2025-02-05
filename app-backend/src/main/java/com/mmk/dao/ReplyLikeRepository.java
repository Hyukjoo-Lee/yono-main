package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mmk.entity.ReplyLikeEntity;

@Repository
public interface ReplyLikeRepository extends JpaRepository<ReplyLikeEntity, Integer> {

    void deleteByRnoAndUserEntity_UserId(int rno, String userId);

    boolean existsByRnoAndUserEntity_UserId(int rno, String userId);

}
