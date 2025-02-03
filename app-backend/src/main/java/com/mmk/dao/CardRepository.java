package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mmk.entity.CardEntity;

public interface CardRepository extends JpaRepository<CardEntity, Integer> {
    boolean existsByCardTitle(String cardTitle);

    CardEntity findByCardId(int cardId);

    CardEntity findByCardTitle(String cardTitle);

    List<CardEntity> findByOrganizationCode(String organizationCode);
}
