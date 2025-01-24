package com.mmk.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.NoticeEntity;

@Repository
public class NoticeDAOImpl implements NoticeDAO{

  @Autowired
  private NoticeRepository noticeRepo;

  @Override
  public void save(NoticeEntity noticeData) {
    noticeRepo.save(noticeData);
  }
  
}