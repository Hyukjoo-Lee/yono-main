package com.mmk.dto;

import java.sql.Timestamp;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

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

    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd") // 직렬화 시 형식 지정
    @JsonDeserialize(using = LocalDateDeserializer.class) // 역직렬화 시 커스텀 처리
    private LocalDate regdate;
    
    private int viewcnt=0;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String imgurl;
    private String file;

    private String userId;


    
    
}
