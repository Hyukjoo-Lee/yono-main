package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mmk.entity.BadgeEntity;

@Repository
public interface BadgeRepository extends JpaRepository<BadgeEntity, Integer> {

}
