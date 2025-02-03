package com.mmk.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.BadgeEntity;

@Repository
public class BadgeDAOImpl implements BadgeDAO {
    
    @Autowired
    private BadgeRepository badgeRepository;

    @Override
    public void save(BadgeEntity badgeEntity) {
        badgeRepository.save(badgeEntity);
    }
    
}
