package com.mmk.dto;

import java.sql.Timestamp;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class NoticeDTO {
    private int nno;
    private int admin_id;
    private String ntitle;
    private String ncont;
     @JsonFormat(pattern = "yyyy-MM-dd")  // 날짜 포맷 지정
    private LocalDate regdate;//댓글 작성일

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
