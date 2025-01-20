package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.CardHistoryEntity;

public interface CardHistoryRepository extends JpaRepository<CardHistoryEntity, String> {
    
}
