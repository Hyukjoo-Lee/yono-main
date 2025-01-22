package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mmk.entity.RankingEntity;

@Repository
public interface RankingRepository extends JpaRepository<RankingEntity, Integer> {

}
