package com.mmk.dto;

// import java.security.Timestamp;
import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommunityDTO {
  
  private int communityNo;
  private String commCategory;
  private String userId;
  private String adminId;
  private String commTitle;
  private String commCont;
  private String commImgUrl;
  private int viewCount;
  private int replyCount;

  private Timestamp createdAt;
  private Timestamp updatedAt;
}
