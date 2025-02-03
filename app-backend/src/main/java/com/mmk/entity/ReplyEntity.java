package com.mmk.entity;

import java.sql.Timestamp;
import java.time.LocalDate;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
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
    
    @Column(name = "rno")
    private int rno; //댓글  번호 

    @Column(name = "pno")
    private int pno; //게시판 번호 
    
    @Size(max = 1000)
    @Column(name = "r_content" , nullable = false, length = 1000)
    private String r_content;

    @Column(name="like_count", nullable = false)
    private int like_count;
    
    
    @Size(max =8)
    @CreationTimestamp
    @Column(name = "regdate", updatable = false, nullable = false, length = 8)
    private LocalDate regdate;
    

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private Timestamp createdAt;

    @CreationTimestamp
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;
    
    @Column(name = "user_id", nullable = false, length = 50)
    private String userId; 
}
