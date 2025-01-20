package com.mmk.entity;

import java.sql.Timestamp;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@SequenceGenerator(
        name = "notice_seq_gename", 
        sequenceName = "notice_seq", 
        initialValue = 1, 
        allocationSize = 1
)
@Table(name = "tbl_notice")
public class NoticeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
            generator = "notice_seq_gename") // 시퀀스 생성기에 설정해 놓은 시퀀스 제너레이터 이름

    private int nno;
    private int admin_id;
    private String ntitle;
    private String ncont;
     @JsonFormat(pattern = "yyyy-MM-dd")  // 날짜 포맷 지정
    private LocalDate regdate;//댓글 작성일

    private Timestamp createdAt;
    private Timestamp updatedAt;
    
}
