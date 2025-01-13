package com.mmk.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.NoticeEntity;

@Repository
public class NoticeDAOImpl implements NoticeDAO {

  @Autowired
  private NoticeRepository noticeRepo;

  @Override
  public void save(NoticeEntity noticeData) {
    this.noticeRepo.save(noticeData);
  }

  @Override
  public List<NoticeEntity> getNoticeList() {
    return this.noticeRepo.findAll();
  }
  
}
