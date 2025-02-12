package com.mmk.service;

import java.util.List;

import com.mmk.dto.NoticeDTO;

/**
 * NoticeService 인터페이스는 공지사항과 관련된 비즈니스 로직을 정의
 */
public interface NoticeService{

  /**
   * 공지사항을 저장
   *
   * @param notice 저장할 공지사항 DTO
   */
  void saveNotice(NoticeDTO notice);
  /**
   * 키워드를 기반으로 공지사항을 검색
   * @param keyword 검색할 키워드
   * @return 검색된 공지사항 목록
   */
  List<NoticeDTO> searchNotice(String keyword);
  /**
   * ID를 기반으로 공지사항을 조회
   * @param id 조회할 공지사항의 ID
   * @return 해당 ID에 해당하는 공지사항 DTO
   */
  NoticeDTO getNoticeById(int id);
  /**
   * 주어진 ID 목록에 해당하는 공지사항을 삭제
   * @param ids 삭제할 공지사항 ID 목록
   */
  void deleteByNotice(List<Integer> ids);
  /**
   * 공지사항 업데이트
   * @param noticeDTO 업데이트할 공지사항 DTO
   * @return 업데이트 성공 여부 (true - 성공, false - 실패)
   */
  boolean updateNotice(NoticeDTO noticeDTO);

}