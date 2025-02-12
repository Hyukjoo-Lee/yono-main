package com.mmk.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 공지사항 정보를 담는 DTO 클래스
 */
@Setter
@Getter
@ToString
public class NoticeDTO {
  
  /**
   * 공지사항 번호
   */
  private int noticeNo;

  /**
   * 공지사항 제목
   */
  private String title;
  /**
   * 작성자 ID
   */
  private String userId;
  /**
   * 공지사항 내용
   */
  private String content;
  /**
   * 이미지 URL
   */
  private String imgurl;

  /**
   * 생성 일자
   */
  private Timestamp createdAt;
  /**
   * 수정 일자
   */
  private Timestamp updatedAt;

}
