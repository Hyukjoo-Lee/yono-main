package com.mmk.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mmk.entity.CardHistoryEntity;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Repository
public class BadgeDAOImpl implements BadgeDAO{

  @PersistenceContext
  private EntityManager entityManager;

  @Override
    public List<CardHistoryEntity> findRecentHistory(int userCardId, String startDate) {
        String query = "SELECT c FROM CardHistoryEntity c " +
                      "WHERE c.userCardEntity.userCardId = :userCardId " +
                      "AND c.resUsedDate >= :startDate " +
                      "ORDER BY c.resUsedDate ASC";

        TypedQuery<CardHistoryEntity> typedQuery = entityManager.createQuery(query, CardHistoryEntity.class);
        typedQuery.setParameter("userCardId", userCardId);
        typedQuery.setParameter("startDate", startDate);

        return typedQuery.getResultList(); // 쿼리 결과 반환
    }

    @Override
    public void save(CardHistoryEntity cardHistoryEntity) {
        entityManager.persist(cardHistoryEntity); // 엔티티 저장
    }
  
}
