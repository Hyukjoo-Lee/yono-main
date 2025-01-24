package com.mmk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.NoticeDAO;
import com.mmk.dto.NoticeDTO;
import com.mmk.entity.NoticeEntity;

import jakarta.transaction.Transactional;

@Service
public class NoticeServiceImpl implements NoticeService {

  @Autowired
  private NoticeDAO noticeDAO;

  @Override
  @Transactional
  public void save(NoticeDTO noticeData) {
    
    NoticeEntity noticeEntity = new NoticeEntity();
    noticeEntity.setTitle(noticeData.getTitle());
    noticeEntity.setContent(noticeData.getContent());
    noticeEntity.setImgurl(noticeData.getImgurl());

    noticeDAO.save(noticeEntity);
  }

}
