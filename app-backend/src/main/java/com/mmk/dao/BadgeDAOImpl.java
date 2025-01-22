package com.mmk.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.mmk.entity.BadgeEntity;

@Repository
public class BadgeDAOImpl implements BadgeDAO {

    @Autowired
    private BadgeRepository badgeRepo;

    @Override
    public List<BadgeEntity> getAllBadges() {
        return badgeRepo.findAll();
    }
}
