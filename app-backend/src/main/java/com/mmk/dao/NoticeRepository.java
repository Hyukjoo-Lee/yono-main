package com.mmk.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mmk.entity.NoticeEntity;

import jakarta.transaction.Transactional;

/**
 * {@link NoticeEntity} 객체에 대한 데이터베이스 작업을 처리하는 JPA 리포지토리 인터페이스
 * CRUD 작업 및 사용자 정의 쿼리를 제공
 * @see NoticeEntity
 */
public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer>{
  /**
   * 주어진 키워드로 공지사항 제목을 검색
   * @param keyword 검색할 키워드 (null인 경우 모든 제목을 반환)
   * @return 제목에 키워드가 포함된 {@link NoticeEntity} 객체의 목록
   */
  @Query("SELECT n FROM NoticeEntity n WHERE"
  +"(:keyword IS NULL OR LOWER(n.title) LIKE LOWER(CONCAT('%',:keyword,'%')))")
  List<NoticeEntity> searchNotice(@Param("keyword") String keyword);

  /**
   * 주어진 공지사항 ID 목록에 해당하는 공지사항들을 삭제
   * @param ids 삭제할 공지사항들의 ID 목록
   */
  @Modifying
  @Transactional
  @Query(value = "DELETE FROM notice WHERE notice_no IN (:ids)", nativeQuery=true)
  void deleteByNotice(List<Integer> ids);

  /**
   * 주어진 공지사항의 제목, 내용, 이미지 URL을 업데이트
   * @param title 업데이트할 공지사항 제목
   * @param content 업데이트할 공지사항 내용
   * @param imgurl 업데이트할 공지사항 이미지 URL
   * @param noticeNo 업데이트할 공지사항 ID
   */
  @Modifying
  @Transactional
  @Query("UPDATE NoticeEntity n SET n.title = :title, n.content = :content, n.imgurl = :imgurl, n.updatedAt = CURRENT_TIMESTAMP WHERE n.noticeNo = :noticeNo")
  void updateNotice(@Param("title") String title,
                    @Param("content") String content,
                    @Param("imgurl") String imgurl,
                    @Param("noticeNo") int noticeNo);
}