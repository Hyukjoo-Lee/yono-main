package com.mmk.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.CardBenefitEntity;

public interface CardBenefitRepository extends JpaRepository<CardBenefitEntity, Integer> {

    CardBenefitEntity findByBenefitId(int benefitId);

    boolean existsByBenefitTitle(String benefitTitle);
}
