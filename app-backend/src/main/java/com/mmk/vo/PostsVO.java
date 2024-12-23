package com.mmk.vo;

import java.sql.Timestamp;

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
@Table(name = "tbl_posts")
@SequenceGenerator(name = "no_seq_gename", sequenceName = "posts_seq",initialValue = 1, allocationSize = 1)
public class PostsVO {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
            generator = "no_seq_gename" // 시퀀스 생성기에 설정해 놓은 시퀀스 제너레이터 이름
    )
    private int no;

    private String title;
    private String category;
    private String id;
    
    @CreationTimestamp
    private Timestamp regdate;

    private int viewcnt;

    @CreationTimestamp
    private Timestamp createdAt;

    @CreationTimestamp
    private Timestamp updatedAt;

    
}
