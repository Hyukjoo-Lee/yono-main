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
public class PostsDTO {

    private int no;
    private String title;
    private String category;
    private String userid;
    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd")  // 날짜 포맷 지정
    private LocalDate regdate;
    
    private int viewcnt;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String imgurl;

    
    
}
