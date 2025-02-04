package com.mmk.dao;

import java.util.List;
import java.util.Optional;

import com.mmk.entity.NoticeEntity;

public interface NoticeDAO {

  void saveNotice(NoticeEntity notice);

  List<NoticeEntity> searchNotice(String keyword);

  NoticeEntity findById(int id);

  Optional<NoticeEntity> findNoticeById(int id);

  void deleteByNotice(List<Integer> ids);

  // void updateNotice(NoticeEntity noticeEntity);
  
}
