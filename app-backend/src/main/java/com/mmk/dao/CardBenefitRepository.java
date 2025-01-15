package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.CardBenefitEntity;

public interface CardBenefitRepository extends JpaRepository<CardBenefitEntity, Integer> {

    CardBenefitEntity findByBenefitId(int benefitId);

    List<CardBenefitEntity> findByCard_CardId(int cardId);

    List<CardBenefitEntity> findByCard_CardTitle(String cardTitle);

    boolean existsByBenefitTitle(String benefitTitle);
}
