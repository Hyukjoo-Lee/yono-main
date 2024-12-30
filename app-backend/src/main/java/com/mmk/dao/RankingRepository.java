package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.RankingEntity;

public interface RankingRepository extends JpaRepository<RankingEntity, Integer> {

}
