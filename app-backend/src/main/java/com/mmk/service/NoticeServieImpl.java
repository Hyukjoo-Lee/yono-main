package com.mmk.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.NoticeDAO;
import com.mmk.dto.NoticeDTO;
import com.mmk.entity.NoticeEntity;

import jakarta.transaction.Transactional;

@Service
public class NoticeServieImpl implements NoticeService {

  @Autowired
  private NoticeDAO noticeDAO;

  @Override
  @Transactional
  public void save(NoticeDTO noticeData) {
    
    NoticeEntity noticeEntity = new NoticeEntity();

    noticeEntity.setNoticeTitle(noticeData.getNoticeTitle());
    noticeEntity.setAdminId(noticeData.getAdminId());
    noticeEntity.setNoticeCont(noticeData.getNoticeCont());
    noticeEntity.setNoticeImgUrl(noticeData.getNoticeImgUrl());

    noticeDAO.save(noticeEntity);
  }

  private NoticeDTO convertToDTO(NoticeEntity entity){

    NoticeDTO dto = new NoticeDTO();

    dto.setNoticeNo(entity.getNoticeNo());
    dto.setAdminId(entity.getAdminId());
    dto.setNoticeTitle(entity.getNoticeTitle());
    dto.setNoticeCont(entity.getNoticeCont());
    dto.setViewCount(entity.getViewCount());

    return dto;
  }

  @Override
  public List<NoticeDTO> getNoticeList() {
    List<NoticeEntity> noticeEntities = noticeDAO.getNoticeList();

    return noticeEntities.stream()
    .map(this::convertToDTO)
    .collect(Collectors.toList());
  }
  
}
