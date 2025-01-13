package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.mmk.entity.ReplyEntity;

public interface ReplyRepository extends JpaRepository<ReplyEntity, Integer> {

    List<ReplyEntity> findByPno(int pno);

    
} 