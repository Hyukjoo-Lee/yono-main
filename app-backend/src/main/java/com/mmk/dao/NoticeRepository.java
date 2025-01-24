package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.NoticeEntity;

public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer>{
  
}