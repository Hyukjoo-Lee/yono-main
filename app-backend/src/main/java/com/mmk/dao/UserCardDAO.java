package com.mmk.dao;

import java.util.List;

import com.mmk.entity.UserCardEntity;

public interface UserCardDAO {
    void registerCard(UserCardEntity userCardEntity);

    // 카드 넘버는 고유해야함
    boolean existsByUserCardNum(String userCardNum);

    List<UserCardEntity> findUserCardEntityByUserId(int userId);
}