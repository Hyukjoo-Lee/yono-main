package com.mmk.dao;

import java.util.List;

import com.mmk.entity.NoticeEntity;

public interface NoticeDAO {

  void saveNotice(NoticeEntity notice);

  List<NoticeEntity> searchNotice(String keyword);
  
}
