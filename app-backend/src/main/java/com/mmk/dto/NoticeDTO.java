package com.mmk.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class NoticeDTO {
  
  private int noticeNo;
  private String adminId;
  private String noticeTitle;
  private String noticeCont;
  private String noticeImgUrl;
  private int viewCount;

  @JsonFormat(pattern="yyyy-mm-dd")
  private Timestamp createdAt;

  private Timestamp updatedAt;
}