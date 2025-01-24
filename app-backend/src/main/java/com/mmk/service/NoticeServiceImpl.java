package com.mmk.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

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

  //글+파일 저장
  @Override
  public void saveNotice(NoticeDTO noticeDTO) {
    NoticeEntity entity = toEntity(noticeDTO);
    noticeDAO.saveNotice(entity);
  }

  //글 리스트 불러오기
  @Override
  public List<NoticeDTO> searchNotice(String keyword) {
    List<NoticeEntity> entities = noticeDAO.searchNotice(keyword);
    return entities.stream().map(this::toDTO).collect(Collectors.toList());
  }
  
  private NoticeDTO toDTO(NoticeEntity entity){
    if(entity == null){
      return null;
    }

    NoticeDTO dto = new NoticeDTO();
    dto.setNoticeNo(entity.getNoticeNo());
    dto.setTitle(entity.getTitle());
    dto.setContent(entity.getContent());
    dto.setImgurl(entity.getImgurl());
    dto.setViewCount(entity.getViewCount());
    dto.setCreatedAt(entity.getCreatedAt());
    dto.setUpdatedAt(entity.getUpdatedAt() != null ? Timestamp.valueOf(entity.getUpdatedAt()) : null);

    if(entity.getUserEntity() != null){
      dto.setUserId(entity.getUserEntity().getUserId());
    }

    return dto;
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
