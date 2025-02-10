package com.mmk.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.NoticeEntity;

/**
 * {@link NoticeDAO} 인터페이스의 구현한 클래스
 * {@link NoticeRepository}를 사용하여 데이터베이스와 상호작용하고,
 * 공지사항에 대한 CRUD 작업을 처리
 * @see NoticeDAO
 * @see NoticeRepository
 */
@Repository
public class NoticeDAOImpl implements NoticeDAO{
  
  @Autowired
  NoticeRepository noticeRepo;

  /**
   * 주어진 공지사항을 데이터베이스에 저장
   * @param notice 저장할 {@link NoticeEntity} 객체
   */
  @Override
  public void saveNotice(NoticeEntity notice) {
    noticeRepo.save(notice);
  }

  /**
   * 주어진 키워드를 기반으로 공지사항을 검색
   * @param keyword 검색할 키워드
   * @return 주어진 키워드와 일치하는 {@link NoticeEntity} 객체 목록
   */
  @Override
  public List<NoticeEntity> searchNotice(String keyword) {
    return noticeRepo.searchNotice(keyword);
  }

  /**
   * 주어진 ID에 해당하는 공지사항을 조회
   * @param id 조회할 공지사항의 ID
   * @return 주어진 ID에 해당하는 {@link NoticeEntity} 객체, 찾을 수 없으면 null 반환
   */
  @Override
  public NoticeEntity findById(int id) {
    return noticeRepo.findById(id).orElse(null);
  }

  /**
   * 주어진 공지사항 ID 목록에 해당하는 공지사항들을 삭제
   * @param ids 삭제할 공지사항들의 ID 목록
   */
  @Override
  public void deleteByNotice(List<Integer> ids) {
    noticeRepo.deleteByNotice(ids);
  }

  /**
   * 주어진 ID에 해당하는 공지사항을 {@link Optional}로 감싸서 조회
   * 
   * @param id 조회할 공지사항의 ID
   * @return 해당 ID에 해당하는 {@link NoticeEntity} 객체를 감싼 {@link Optional},
   *         찾을 수 없으면 비어있는 {@link Optional} 반환
   */
  @Override
  public Optional<NoticeEntity> findNoticeById(int id) {
    return noticeRepo.findById(id);
  }
  
}