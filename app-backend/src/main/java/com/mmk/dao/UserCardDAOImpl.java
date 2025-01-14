package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.UserCardEntity;

@Repository
public class UserCardDAOImpl implements UserCardDAO {

    @Autowired
    private UserCardRepository userCardRepository;

    @Override
    public void registerCard(UserCardEntity userCardEntity) {
        userCardRepository.save(userCardEntity);
    }

    // @Override
    // public UserCardEntity findByUserCardEntityUserId(int userId) {
    // UserCardEntity userCardEntity =
    // userCardRepository.findByUserEntityUserId(userId);
    // return userCardEntity;
    // }

    @Override
    public boolean existsByUserCardNum(String userCardNum) {
        return existsByUserCardNum(userCardNum);
    }

    @Override
    public List<UserCardEntity> findUserCardEntityByUserId(int userId) {
        return null;
        // 구현중
    }
}
