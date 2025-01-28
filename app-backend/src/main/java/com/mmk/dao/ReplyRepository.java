package com.mmk.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.mmk.entity.ReplyEntity;

public interface ReplyRepository extends JpaRepository<ReplyEntity, Integer> {

    List<ReplyEntity> findByPno(int pno);

    Optional<ReplyEntity> findByRno(int rno);

    void deleteByPno(int pno);
    
} 