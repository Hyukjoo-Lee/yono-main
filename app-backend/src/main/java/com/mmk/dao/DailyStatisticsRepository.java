package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.DailyStatisticsEntity;

public interface DailyStatisticsRepository extends JpaRepository<DailyStatisticsEntity, Integer> {

}
