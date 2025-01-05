package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.CardEntity;

public interface CardRepository extends JpaRepository<CardEntity, Integer>{
    
}
