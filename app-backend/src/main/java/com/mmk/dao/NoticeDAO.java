package com.mmk.dao;

import java.util.List;

import com.mmk.entity.NoticeEntity;

public interface NoticeDAO {
  
  void save(NoticeEntity noticeData);

  List<NoticeEntity> getNoticeList();
}
