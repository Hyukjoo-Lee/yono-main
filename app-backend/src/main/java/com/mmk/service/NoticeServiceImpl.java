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

/**
 * NoticeServiceImpl 클래스는 NoticeService 인터페이스의 구현체로,
 * 공지사항과 관련된 비즈니스 로직을 처리
 */
@Service
@Transactional
public class NoticeServiceImpl implements NoticeService {

  @Autowired
  private NoticeDAO noticeDAO;

  @Autowired
  private UserService userService;

  /**
   * 공지사항 저장
   * 
   * @param noticeDTO 저장할 공지사항 DTO
   */
  @Override
  public void saveNotice(NoticeDTO noticeDTO) {
    NoticeEntity entity = toEntity(noticeDTO);
    noticeDAO.saveNotice(entity);
  }

  /**
   * 키워드를 기반으로 공지사항 검색
   * @param keyword 검색할 키워드
   * @return 검색된 공지사항 목록
   */
  @Override
  public List<NoticeDTO> searchNotice(String keyword) {
    List<NoticeEntity> entities = noticeDAO.searchNotice(keyword);
    return entities.stream().map(this::toDTO).collect(Collectors.toList());
  }

  /**
     * ID를 기반으로 공지사항 조회
     * @param id 조회할 공지사항의 ID
     * @return 해당 ID에 해당하는 공지사항 DTO
     */
  @Override
  public NoticeDTO getNoticeById(int id) {
    NoticeEntity noticeEntity = noticeDAO.findById(id);
    if(noticeEntity == null){
      throw new RuntimeException("Notice not found with ID : "+id);
    }
    return toDTO(noticeEntity);
  }

  /**
     * 주어진 ID 목록에 해당하는 공지사항 삭제
     * @param ids 삭제할 공지사항 ID 목록
     */
  @Transactional
  @Override
  public void deleteByNotice(List<Integer> ids) {
    noticeDAO.deleteByNotice(ids);
  }

  /**
     * 공지사항 업데이트
     *
     * @param noticeDTO 업데이트할 공지사항 DTO
     * @return 업데이트 성공 여부 (true - 성공, false - 실패)
     */
  @Override
  public boolean updateNotice(NoticeDTO noticeDTO) {
    NoticeEntity existingNotice = noticeDAO.findById(noticeDTO.getNoticeNo());
    if(existingNotice == null){
      return false;
    }

    existingNotice.setTitle(noticeDTO.getTitle());
    existingNotice.setContent(noticeDTO.getContent());
    if(noticeDTO.getImgurl() != null){
      existingNotice.setImgurl(noticeDTO.getImgurl());
    }

    noticeDAO.saveNotice(existingNotice);
    return true;
  }

  /**
     * NoticeEntity를 NoticeDTO로 변환
     * @param entity 변환할 NoticeEntity 객체
     * @return 변환된 NoticeDTO 객체
     */
  private NoticeDTO toDTO(NoticeEntity entity){
    if(entity == null){
      return null;
    }

    NoticeDTO dto = new NoticeDTO();
    dto.setNoticeNo(entity.getNoticeNo());
    dto.setTitle(entity.getTitle());
    dto.setContent(entity.getContent());
    dto.setImgurl(entity.getImgurl());
    // dto.setViewCount(entity.getViewCount());
    dto.setCreatedAt(entity.getCreatedAt());
    dto.setUpdatedAt(entity.getUpdatedAt() != null ? Timestamp.valueOf(entity.getUpdatedAt()) : null);

    if(entity.getUserEntity() != null){
      dto.setUserId(entity.getUserEntity().getUserId());
    }

    return dto;
  }

  /**
     * NoticeDTO를 NoticeEntity로 변환
     * @param dto 변환할 NoticeDTO 객체
     * @return 변환된 NoticeEntity 객체
     */
  private NoticeEntity toEntity(NoticeDTO dto){
    if(dto == null){
      return null;
    }
    
    NoticeEntity entity = new NoticeEntity();
    entity.setNoticeNo(dto.getNoticeNo());
    entity.setTitle(dto.getTitle());
    entity.setContent(dto.getContent());
    entity.setImgurl(dto.getImgurl());
    // entity.setViewCount(dto.getViewCount());
    entity.setCreatedAt(dto.getCreatedAt());
    entity.setUpdatedAt(dto.getUpdatedAt() != null ? dto.getUpdatedAt().toLocalDateTime() : null);

    if(dto.getUserId() != null && !dto.getUserId().isEmpty()){
      entity.setUserEntity(userService.findByUserId(dto.getUserId()));
    }
    return entity;
  }
}
