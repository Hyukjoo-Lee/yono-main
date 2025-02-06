package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.UserCardCompanyEntity;

public interface UserCardCompanyRepository extends JpaRepository<UserCardCompanyEntity, Integer> {
    boolean existsByUserNumAndOrganizationCode(int userNum, String organization);

    UserCardCompanyEntity findByCardCompanyNum(int cardCompanyNum);

    UserCardCompanyEntity findByUserNumAndOrganizationCode(int userNum, String organization);
}