package com.mmk.dao;

import java.util.List;
import java.util.Optional;

import com.mmk.entity.NoticeEntity;

/**
 * NoticeDAO 인터페이스는 공지사항에 대한 CRUD (생성, 조회, 수정, 삭제) 작업을 처리하는 메서드를 제공
 * {@link NoticeEntity} 객체와 관련된 데이터 영속성 계층과의 상호작용을 위한 계약을 정의
 */
public interface NoticeDAO {
  /**
   * 새로운 공지사항을 데이터베이스에 저장
   * @param notice 저장할 {@link NoticeEntity} 객체
   */
  void saveNotice(NoticeEntity notice);
  /**
   * 주어진 키워드를 기반으로 공지사항을 검색
   * @param keyword 검색할 키워드
   * @return 키워드와 일치하는 {@link NoticeEntity} 객체의 목록
   */
  List<NoticeEntity> searchNotice(String keyword);
  /**
   * 주어진 ID에 해당하는 공지사항을 조회
   * @param id 조회할 공지사항의 ID
   * @return 주어진 ID에 해당하는 {@link NoticeEntity} 객체
   */
  NoticeEntity findById(int id);
  /**
   * 주어진 ID에 해당하는 공지사항을 {@link Optional}로 감싸서 조회
   * @param id 조회할 공지사항의 ID
   * @return 해당 ID에 해당하는 {@link NoticeEntity} 객체를 감싼 {@link Optional},
   *         찾을 수 없으면 비어있는 {@link Optional} 반환
   */
  Optional<NoticeEntity> findNoticeById(int id);
  /**
   * 주어진 공지사항 ID 목록에 해당하는 공지사항들을 삭제
   * @param ids 삭제할 공지사항들의 ID 목록
   */
  void deleteByNotice(List<Integer> ids);
  
}
