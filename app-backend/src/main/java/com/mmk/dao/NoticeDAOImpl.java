package com.mmk.dao;

import java.util.List;

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

  @Override
  public List<NoticeEntity> searchNotice(String keyword) {
    return noticeRepo.searchNotice(keyword);
  }

  @Override
  public NoticeEntity findById(int id) {
    return noticeRepo.findById(id).orElse(null);
  }
  
}