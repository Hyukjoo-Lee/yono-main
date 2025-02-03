package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.BadgeEntity;

public interface BadgeRepository extends JpaRepository<BadgeEntity, Integer>{

    
}
