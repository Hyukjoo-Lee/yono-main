package com.mmk.dto;

import java.security.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class NoticeDTO {
  
  private int noticeNo;

  private String title;
  private String userId;
  private String content;
  private String imgurl;
  private int viewCount;

  private Timestamp createdAt;
  private Timestamp updatedAt;
}
