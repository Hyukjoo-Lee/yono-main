package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.mmk.entity.UserCardEntity;
import com.mmk.entity.UserEntity;

public interface UserCardRepository extends JpaRepository<UserCardEntity, Integer> {
    boolean existsByUserCardNum(String userCardNum);

    @Modifying
    @Transactional
    @Query("UPDATE UserCardEntity u SET u.primaryCard = 0 WHERE u.userEntity.userNum = :userNum")
    void removePrimaryCardAll(@Param("userNum") int userNum);

    UserCardEntity findByUserEntityAndPrimaryCard(UserEntity userEntity, int primaryCard);

    @Modifying
    @Query("UPDATE UserCardEntity u SET u.primaryCard = 1 WHERE u.userCardId = :userCardId")
    void setPrimaryCard(@Param("userCardId") int userCardId);

    UserCardEntity findByUserCardId(int userCardId);

    // @Query("UPDATE UserCardEntity u SET u.companyId = :companyId, u.companyPwd = :companyPwd, u.connectedId = :connectedId WHERE u.userNum = :userNum AND u.organization = :organization")
    // void updateAllByUserNumAndOrganization(@Param("userNum") int userNum, @Param("organization") String organization, @Param("companyId") String companyId, @Param("companyPwd") String companyPwd, @Param("connectedId") String connectedId);
}
