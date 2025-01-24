package com.mmk.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.NoticeEntity;

@Repository
public class NoticeDAOImpl implements NoticeDAO{

  @Autowired
  NoticeRepository noticeRepo;

  @Override
  public void saveNotice(NoticeEntity notice) {
    noticeRepo.save(notice);
  }
  
}