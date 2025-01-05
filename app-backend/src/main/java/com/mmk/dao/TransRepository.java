package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.CardEntity;

public interface TransRepository extends JpaRepository<CardEntity, Integer> {

}
