package com.mmk.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

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

  // @Autowired
  // private UserDAO userDAO;

  @Autowired
  private UserService userService;

  //글+파일 저장
  @Override
  public void saveNotice(NoticeDTO noticeDTO) {
    NoticeEntity entity = toEntity(noticeDTO);
    noticeDAO.saveNotice(entity);
  }

  // //글+파일 저장2
  // @Override
  // public void save(NoticeDTO noticeData) {
  //   System.out.println("사용자 ID : " + noticeData.getUserId());
  //   UserEntity userEntity = userDAO.getUerByUserId(noticeData.getUerId());
  //   if(userEntity == null){
  //     throw new RuntimeException("유효하지 않은 사용자 ID : " + noticeData.getUserId());
  //   }
  // }

  //글 리스트 불러오기
  @Override
  public List<NoticeDTO> searchNotice(String keyword) {
    List<NoticeEntity> entities = noticeDAO.searchNotice(keyword);
    return entities.stream().map(this::toDTO).collect(Collectors.toList());
  }

  //글 상세보기
  @Override
  public NoticeDTO getNoticeById(int id) {
    NoticeEntity noticeEntity = noticeDAO.findById(id);
    if(noticeEntity == null){
      throw new RuntimeException("Notice not found with ID : "+id);
    }
    return toDTO(noticeEntity);
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

  @Transactional
  @Override
  public void deleteByNotice(List<Integer> ids) {
    noticeDAO.deleteByNotice(ids);
  }
  
}
