package com.mmk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.NoticeDAO;
import com.mmk.dto.NoticeDTO;
import com.mmk.entity.NoticeEntity;

@Service
public class NoticeServiceImpl implements NoticeService {

  @Autowired
  private NoticeDAO noticeDAO;

  @Autowired
  private UserService userService;

  @Override
  public void saveNotice(NoticeDTO noticeDTO) {
    NoticeEntity entity = toEntity(noticeDTO);
    noticeDAO.saveNotice(entity);
  }
  
  private NoticeEntity toEntity(NoticeDTO dto){
    if(dto == null){
      return null;
    }
    
    NoticeEntity entity = new NoticeEntity();
    entity.setNoticeNo(dto.getNoticeNo());
    entity.setTitle(dto.getTitle());
    entity.setContent(dto.getContent());
    entity.setImgurl(dto.getImgurl());
    entity.setViewCount(dto.getViewCount());
    entity.setCreatedAt(dto.getCreatedAt());
    entity.setUpdatedAt(dto.getUpdatedAt() != null ? dto.getUpdatedAt().toLocalDateTime() : null);

    if(dto.getUserId() != null && !dto.getUserId().isEmpty()){
      entity.setUserEntity(userService.findByUserId(dto.getUserId()));
    }
    return entity;
  }
  
}
