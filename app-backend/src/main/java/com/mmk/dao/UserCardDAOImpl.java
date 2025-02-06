package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.UserCardEntity;
import com.mmk.entity.UserEntity;

@Repository
public class UserCardDAOImpl implements UserCardDAO {

    @Autowired
    private UserCardRepository userCardRepository;

    @Override
    public void registerCard(UserCardEntity userCardEntity) {
        userCardRepository.save(userCardEntity);
    }

    @Override
    public boolean existsByUserCardNum(String userCardNum) {
        return userCardRepository.existsByUserCardNum(userCardNum);
    }

    @Override
    public List<UserCardEntity> getAllCardsByUserNum(int userNum) {
        return userCardRepository.findByUserEntityUserNum(userNum);
    }

    @Override
    public List<UserCardEntity> getAllCardsInfoByUserNum(int userNum) {
        return userCardRepository.findAllByUserNum(userNum);
    }

    @Override
    public void removePrimaryCardAll(int userNum) {
        userCardRepository.removePrimaryCardAll(userNum);
    }

    @Override
    public void setPrimaryCard(int userCardId) {
        userCardRepository.setPrimaryCard(userCardId);
    }

    @Override
    public UserCardEntity findByUserNumAndPrimaryCard(UserEntity userEntity, String primaryCard) {
        return userCardRepository.findByUserEntityAndPrimaryCard(userEntity, primaryCard);
    }

    @Override
    public UserCardEntity findByUserCardId(int userCardId) {
        return userCardRepository.findByUserCardId(userCardId);
    }

    // @Override
    // public void updateAllByUserNumAndOrganization(int userNum, String
    // organization, String companyId, String companyPwd, String connectedId) {
    // userCardRepository.updateAllByUserNumAndOrganization(userNum, organization,
    // companyId, companyPwd, connectedId);
    // }
}
