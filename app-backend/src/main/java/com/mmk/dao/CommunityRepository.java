package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.CommunityEntity;

public interface CommunityRepository extends JpaRepository<CommunityEntity, Integer> {
    
}