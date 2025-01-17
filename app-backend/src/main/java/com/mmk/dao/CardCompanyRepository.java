package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.CardCompanyEntity;

public interface CardCompanyRepository extends JpaRepository<CardCompanyEntity, Integer> {
    boolean existsByUserNumAndOrganization(int userNum, String organization);

    CardCompanyEntity findByCardCompanyNum(int cardCompanyNum);

    CardCompanyEntity findCardCompanyEntityByUserNumAndOrganization(int userNum, String organization);
}