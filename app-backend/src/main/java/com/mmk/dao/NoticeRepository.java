package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mmk.entity.NoticeEntity;

import jakarta.transaction.Transactional;

public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer>{
  @Query("SELECT n FROM NoticeEntity n WHERE"
  +"(:keyword IS NULL OR LOWER(n.title) LIKE LOWER(CONCAT('%',:keyword,'%')))")
  List<NoticeEntity> searchNotice(@Param("keyword") String keyword);

  @Modifying
  @Transactional
  @Query(value = "DELETE FROM notice WHERE notice_no IN (:ids)", nativeQuery=true)
  void deleteByNotice(List<Integer> ids);
}