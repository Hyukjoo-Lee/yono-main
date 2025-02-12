package com.mmk.dto;

import java.sql.Timestamp;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReplyDTO {

    private int rno; //댓글 고유 아이디디 => 번호 
    private int pno; //게시판 번호 
    private String userId;
    private String r_content;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private int like_count;
    private String profile;

    @JsonFormat(pattern = "yyyy-MM-dd")  // 날짜 포맷 지정
    private LocalDate regdate;//댓글 작성일
    
}
