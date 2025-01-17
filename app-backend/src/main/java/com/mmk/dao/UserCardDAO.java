package com.mmk.dao;

import java.util.List;

import com.mmk.entity.UserCardEntity;
import com.mmk.entity.UserEntity;

public interface UserCardDAO {
    void registerCard(UserCardEntity userCardEntity);

    // 카드 넘버는 고유해야함
    boolean existsByUserCardNum(String userCardNum);

    List<UserCardEntity> findUserCardEntityByUserId(int userId);

    void removePrimaryCardAll(int userNum);

    UserCardEntity findByUserNumAndPrimaryCard(UserEntity userEntity, int primaryCard);

    // void updateAllByUserNumAndOrganization(int userNum, String organization, String companyId, String companyPwd, String connectedId);
}