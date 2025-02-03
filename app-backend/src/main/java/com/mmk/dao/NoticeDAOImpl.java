package com.mmk.dao;

import java.util.List;
import java.util.Optional;

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

  @Override
  public void deleteByNotice(List<Integer> ids) {
    noticeRepo.deleteByNotice(ids);
  }

  @Override
  public Optional<NoticeEntity> findNoticeById(int id) {
    return noticeRepo.findById(id);
  }

  // @Override
  // public void updateNotice(NoticeEntity noticeEntity) {
  //   noticeRepo.updateNotice(noticeEntity.getTitle(),noticeEntity.getContent(),noticeEntity.getViewCount(),noticeEntity.getImgurl(),noticeEntity.getNoticeNo());
  // }
  
}