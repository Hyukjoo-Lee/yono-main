package com.mmk.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.CommunityEntity;

public interface CommunityRepository extends JpaRepository<CommunityEntity, Integer>{
  
  Optional<CommunityEntity> findById(String id);
}
