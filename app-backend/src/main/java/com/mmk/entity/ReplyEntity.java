package com.mmk.entity;

import java.sql.Timestamp;
import java.time.LocalDate;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(
    name ="reply_seq_generator",
    sequenceName = "reply_seq",
    initialValue = 1,
    allocationSize = 1
)

@Table(name="tbl_reply")
public class ReplyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
            generator = "reply_seq_generator") // 시퀀스 생성기에 설정해 놓은 시퀀스 제너레이터 이름
    
    private int rno; //댓글  번호 
    private int pno; //게시판 번호 
    private String userId; 
    private String r_content;
    private int like_count;


    @CreationTimestamp
    private LocalDate regdate;

    @CreationTimestamp
    private Timestamp createdAt;
    @CreationTimestamp
    private Timestamp updatedAt;
}
